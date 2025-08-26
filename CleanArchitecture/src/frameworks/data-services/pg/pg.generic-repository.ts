import AppNotFoundException from 'src/application/exception/app-not-found.exception';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IGenericRepository, keyValueObj, OtherMethodOptions } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { EntityManager, ObjectLiteral, Repository } from 'typeorm';
import { patchUpdatedAt } from 'src/common/utils/patch-updatedAt';
import rescue from 'src/common/helpers/rescure.helper';
import { IPaginationData } from 'src/common/interface/response/response-data.interface';
import { IPaginationQuery } from 'src/common/interface/response/pagination-options.interface';
import { RelationType } from 'src/common/type/relation';


//changes extends ObjectLiteral in Igeneric inerface and here
export class PgGenericRepository<T extends ObjectLiteral> implements IGenericRepository<T> {
  protected _repository: Repository<T>;
  protected cls: IClsStore<AppClsStore>;

  constructor(cls: IClsStore<AppClsStore>, repository: Repository<T>) {
    this.cls = cls;
    this._repository = repository;
  }

  private getRepo(manager?: EntityManager) {
    return manager
      ? manager.getRepository(this._repository.target)
      : this._repository;
  }

  async getAll(
    condition: NonNullable<unknown> | any[],
    relations: NonNullable<unknown>,
    order: NonNullable<unknown>,
    select: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<IPaginationData> {
    return rescue<IPaginationData>(async (): Promise<IPaginationData> => {
      let { page, limit } =
        this.cls.get<IPaginationQuery>('paginationQuery') || {};
      if (!page) page = 1;
      if (!limit) limit = 10;

      const repo = this.getRepo(manager);
      const [data, total] = await repo.findAndCount({
        where: Array.isArray(condition) ? [...condition] : condition,
        skip: (page - 1) * limit,
        take: limit,
        relations: { ...relations },
        order: order ?? ({ id: 'DESC' } as any),
        select,
      });

      return {
        data: data as T[],
        total,
        limit,
        page,
        previous: page > 1 ? `${page - 1}` :undefined,
        next: page * limit < total ? `${page + 1}` : undefined,
      };
    });
  }

  async getAllWithoutPagination(
    condition: NonNullable<unknown> | any[],
    relations?: NonNullable<unknown>,
    order?: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<T[]> {
    return rescue<T[]>(async (): Promise<T[]> => {
      const repo = this.getRepo(manager);
      return repo.find({
        where: condition,
        relations: relations ? { ...relations } : undefined,
        order,
      });
    });
  }
 

  async getOne(
    condition: any,
    relations?: NonNullable<unknown>,
    select?: NonNullable<unknown>,
  ): Promise<T> {
    return rescue<T>(async (): Promise<T> => {
      const repo = this.getRepo(); // no manager in this signature
      const item = await repo.findOne({
        where: condition,
        relations: relations,
        select: select,
      });

      if (!item) {
        throw new AppNotFoundException(
          repo.metadata.targetName.replace('Entity', '') + ' not found',
          404,
        );
      }

      return item;
    });
  }


  // async getOneOrNull(
  //   condition: any,
  //   relations?: NonNullable<unknown>,
  //   options?: OtherMethodOptions,
  //   manager?: EntityManager,
  // ): Promise<T | null> {
  //   return rescue<T>(async (): Promise<T> => {
  //     const repo = this.getRepo(manager);
  //     const item = await repo.findOne({
  //       where: condition,
  //       relations: { ...relations },
  //       ...options,
  //     });
  //     return item ?? null;
  //   });
  // }

  async getOneOrNull(
  condition: any,
  relations?: NonNullable<unknown>,
  methodOptions?: OtherMethodOptions & { select?: any },
  manager?: EntityManager,
): Promise<T | null> {
  return rescue<T | null>(async (): Promise<T | null> => {
    const repo = this.getRepo(manager);
    return repo.findOne({
      where: condition,
      relations,
      ...methodOptions,
    }) || null;
  });
}

  async count(condition: any): Promise<number> {
    return rescue<number>(async (): Promise<number> => {
      const repo = this.getRepo();
      return repo.count({
        where: condition,
      });
    });
  }

  async countWithComplexCondition(condition: any): Promise<number> {
    return rescue<number>(async (): Promise<number> => {
      const repo = this.getRepo();
      const queryBuilder = repo.createQueryBuilder('entity');

      Object.keys(condition).forEach((key) => {
        const value = condition[key];

        if (Array.isArray(value)) {
          // IN query
          queryBuilder.andWhere(`entity.${key} IN (:...${key}Values)`, {
            [`${key}Values`]: value,
          });
        } else if (typeof value === 'object' && value?.type && value?.value) {
          // Handle recent date filtering
          let interval = '';
          switch (value.type) {
            case 'day':
              interval = `${value.value} days`;
              break;
            case 'week':
              interval = `${value.value} weeks`;
              break;
            case 'month':
              interval = `${value.value} months`;
              break;
            case 'year':
              interval = `${value.value} years`;
              break;
            default:
              throw new Error(`Invalid interval type: ${value.type}`);
          }

          queryBuilder.andWhere(
            `entity.${key} >= NOW() - INTERVAL '${interval}'`,
          );
        } else {
          // Exact match
          queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
        }
      });

      return queryBuilder.getCount();
    });
  }

  async create(item: T, manager?: EntityManager): Promise<T> {
    return rescue<T>(async (): Promise<T> => {
      const repo = this.getRepo(manager);
      return repo.save(item);
    });
  }

  async createBulk(items: T[], manager?: EntityManager): Promise<T[]> {
    return rescue<T[]>(async (): Promise<T[]> => {
      const repo = this.getRepo(manager);
      return repo.save(items);
    });
  }

  async update(
    condition: NonNullable<unknown>,
    item: any,
    manager?: EntityManager,
  ): Promise<T> {
    return rescue<T>(async (): Promise<T> => {
    const repo = this.getRepo(manager);
    await repo.update(condition, patchUpdatedAt(item));
     const updateItem= await repo.findOneBy(condition);
      if(!updateItem){
        throw new Error('failed to retrive updated item');
      }
      return updateItem
    });
  }

  async updateMany(
    condition: NonNullable<unknown>,
    item: any,
    manager?: EntityManager,
  ): Promise<any> {
    return rescue<any>(async (): Promise<any> => {
      const repo = this.getRepo(manager);
      return repo.update(condition, patchUpdatedAt(item));
    });
  }

  async findOrCreate(
    condition: NonNullable<unknown>,
    item: T,
    relations?: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<T> {
    return rescue<T>(async (): Promise<T> => {
      const repo = this.getRepo(manager);
      const found = await repo.findOne({
        where: condition,
        relations: { ...relations },
      });
      return found ?? repo.save(item);
    });
  }

  async createOrUpdate(
    condition: NonNullable<unknown>,
    item: any,
    relations?: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<T> {
    const repo = this.getRepo(manager);
    const found = await repo.findOne({
      where: condition,
      relations: { ...relations },
    });
    if (!found) return repo.save(item);

    const updated = repo.merge(found, item);
    return repo.save(updated);
  }

  async remove(
    condition: NonNullable<unknown>,
    relations?: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<any> {
    return rescue<any>(async (): Promise<any> => {
      const repo = this.getRepo(manager);
      const data = await this.getAllWithoutPagination(
        condition,
        relations,
        undefined,
        manager,
      );
      return repo.softRemove(data);
    });
  }

  async delete(
    condition: NonNullable<unknown>,
    relations?: NonNullable<unknown>,
    manager?: EntityManager,
  ): Promise<any> {
    return rescue<any>(async (): Promise<any> => {
      const repo = this.getRepo(manager);
      const data = await this.getAllWithoutPagination(
        condition,
        relations,
        undefined,
        manager,
      );
      return repo.remove(data);
    });
  }
}
