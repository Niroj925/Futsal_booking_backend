import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { authEntity } from 'src/entity/auth.entity';
import { hash } from 'src/common/helpers/hash.helper';
import { roleType } from 'src/common/constants';
import { superAdminEntity } from 'src/entity/superAdmin.entity';
import { adminEntity } from 'src/entity/admin.entity';


@Injectable()
export class SuperAdminService {
  constructor(
    @InjectRepository(authEntity)
    private readonly authRepository: Repository<authEntity>,

    private hash: hash,
    private dataSource: DataSource,
  ) {}

  async createSuperAdmin(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const isExist = await this.authRepository.findOne({
      where: { role: roleType.superAdmin },
    });
    if (isExist) {
      throw new ForbiddenException('Super Admin Already Exist');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email, password } = createAuthDto;
      const hashedPassword = await this.hash.value(password);
      const auth = new authEntity();
      auth.email = email;
      (auth.password = hashedPassword), (auth.role = roleType.superAdmin);
      await queryRunner.manager.save(auth);

      const admin = new superAdminEntity();
       admin.name="",
       admin.auth=auth
      await queryRunner.manager.save(admin);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new ForbiddenException(error.errorResponse);
    } finally {
      await queryRunner.release();
    }
  }

  async createRestaurant(createAuthDto: CreateAuthDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email, password } = createAuthDto;
      const hashedPassword = await this.hash.value(password);
      const auth = new authEntity();
      auth.email = email;
      (auth.password = hashedPassword), (auth.role = roleType.admin);
      await queryRunner.manager.save(auth);

      const admin = new adminEntity();
       admin.name="",
       admin.auth=auth
      await queryRunner.manager.save(admin);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new ForbiddenException(error.errorResponse);
    } finally {
      await queryRunner.release();
    }
  }

  create(createSuperAdminDto: CreateSuperAdminDto) {
    return 'This action adds a new superAdmin';
  }

  findAll() {
    return `This action returns all superAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} superAdmin`;
  }

  update(id: number, updateSuperAdminDto: UpdateSuperAdminDto) {
    return `This action updates a #${id} superAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} superAdmin`;
  }
}
