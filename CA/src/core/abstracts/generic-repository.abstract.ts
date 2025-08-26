import { IPaginationData } from 'src/common/interface/response/response-data.interface';
import { RelationType } from 'src/common/type/relation';
import { EntityManager, ObjectLiteral } from 'typeorm';

export type keyValueObj = {
  [key: string]: any;
};
export type OtherMethodOptions = {
  withDeleted?: boolean;
};
export abstract class IGenericRepository<T extends ObjectLiteral> {
  abstract count(condition?: keyValueObj): Promise<number>;
  abstract countWithComplexCondition(condition?: keyValueObj): Promise<number>;

  abstract getAll(
    condition?: keyValueObj | any[],
    relations?: RelationType,
    order?: keyValueObj,
    select?: keyValueObj,
    manager?: EntityManager,
  ): Promise<IPaginationData>;

  abstract getAllWithoutPagination(
    condition?: keyValueObj | any[],
    relations?: RelationType,
    order?: keyValueObj,
    manager?: EntityManager,
  ): Promise<T[]>;

  abstract getOne(
    condition: keyValueObj,
    relations?: RelationType,
    select?: keyValueObj,
  ): Promise<T>;

  abstract getOneOrNull(
    condition: keyValueObj | any[],
    relations?: RelationType,
    methodOptions?: OtherMethodOptions & { select?: any },
    manager?: EntityManager,
  ): Promise<T | null>;

  abstract create(item: T, manager?: EntityManager): Promise<T>;

  abstract update(
    condition: keyValueObj,
    item: Partial<T>,
    manager?: EntityManager,
  ): Promise<T>;

  abstract findOrCreate(
    condition: keyValueObj,
    item: T,
    relations?: RelationType,
    manager?: EntityManager,
  ): Promise<T>;

  abstract createOrUpdate(
    condition: keyValueObj,
    item: T,
    relations?: RelationType,
    manager?: EntityManager,
  ): Promise<T>;

  abstract createBulk(items: T[], manager?: EntityManager): Promise<T[]>;

  abstract updateMany(condition: keyValueObj, item: keyValueObj): Promise<any>;

  abstract remove(
    condition: keyValueObj,
    relations?: RelationType,
    manager?: EntityManager,
  ): Promise<any>;

  abstract delete(
    condition: keyValueObj,
    relations?: RelationType,
    manager?: EntityManager,
  ): Promise<any>;
}
