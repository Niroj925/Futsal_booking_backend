import { Injectable } from '@nestjs/common';
import { UserFactoryUseCaseService } from './user-factory-use-case.service';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import {
  AppClsStore,
  UserClsData,
} from 'src/common/interface/app-cls-store.interface';
import { ConfigService } from '@nestjs/config';
import {
  CreateUserDto,
  UserIdsDto,
} from 'src/core/dtos/request/user/create-user.dto';
import AppException from 'src/application/exception/app.exception';
import { BcryptService } from 'src/services/bcrypt/bcrypt.service';
import { AuthFactoryUseCaseService } from '../auth/auth-factory-use-case.service';
import { IPaginationData } from 'src/common/interface/response/response-data.interface';
import { UserModel } from 'src/core/models/user.model';
import { RoleType } from 'src/common/enums';
import { UpdateUserDto } from 'src/core/dtos/request/user/update-user.dto';

@Injectable()
export class UserUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private bcryptService: BcryptService,
    private cls: IClsStore<AppClsStore>,
    private userFactoryUseCaseService: UserFactoryUseCaseService,
    private authFactoryUseCaseService: AuthFactoryUseCaseService,
  ) {}

  async getAllUsers(
    filters: Record<string, any> = {},
  ): Promise<IPaginationData> {
    const queryFilter: any = {};

    if (filters?.status !== undefined) {
      if (typeof filters.status === 'string') {
        queryFilter.status = filters.status.toLowerCase() === 'true';
      } else {
        queryFilter.status = filters.status;
      }
    }

    const response = await this.dataServices.user.getAll(
      queryFilter,
      {
        auth: true,
      },
      {},
      {
        id: true,
        name: true,
        contact: true,
        status: true,
        auth: {
          email: true,
        },
      },
    );

    const parseData = response.data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        contact: user.contact,
        email: user.auth.email,
        status: user.status,
      };
    });

    return {
      ...response,
      data: parseData,
    };
  }

  async getuser(): Promise<UserModel> {
    const usrCls = this.cls.get<UserClsData>('user');
    const user = await this.dataServices.user.getOne(
      {
        id: usrCls?.userId,
      },
      {
        auth: true,
      },
      {
        id: true,
        name: true,
        contact: true,
        auth: {
          user: true,
        },
        status: true,
      },
    );
    return user;
  }

  async getUserById(userId: string): Promise<UserModel> {
    const user = await this.dataServices.user.getOne(
      {
        id: userId,
      },
      {
        auth: true,
      },
      {
        id: true,
        name: true,
        contact: true,
        auth: {
          user: true,
        },
        status: true,
      },
    );
    return user;
  }

  async userSignUp(dto: CreateUserDto) {
    const existingUser = await this.dataServices.auth.getOneOrNull({
      email: dto.email,
    });
    if (existingUser) {
      throw new AppException(
        { message: 'User with this email already exists' },
        'User with this email already exists',
        409,
      );
    }

    return await this.dataServices.transaction(async (manager) => {
      const UserModel = this.userFactoryUseCaseService.createUser(dto);
      const newUser = await this.dataServices.user.create(UserModel, manager);
      const UserAuthModel = this.authFactoryUseCaseService.createAuth({
        userId: newUser.id,
        email: dto.email,
        password: await this.bcryptService.hash(dto.password),
        role: RoleType.USER,
      });

      await this.dataServices.auth.create(UserAuthModel, manager);
      manager;
    });
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    return await this.dataServices.transaction(async (manager) => {
      const auth = await this.dataServices.auth.getOne({ user: { id } });
      const userModel = this.userFactoryUseCaseService.updateUser(dto);
      await this.dataServices.user.update({ id }, userModel, manager);

      const authModel = this.authFactoryUseCaseService.updateAuth(dto);

      await this.dataServices.auth.update({ id: auth.id }, authModel, manager);
    });
  }

  async updateUserStatusBulk(dto: UserIdsDto, status: boolean) {
    return await Promise.all(
      dto.userIds.map(async (id) => {
        const userModel = this.userFactoryUseCaseService.updateUser({
          status,
        });
        await this.dataServices.user.update({ id }, userModel);
        return true;
      }),
    );
  }

  async deleteUser(id: string) {
    const auth = await this.dataServices.auth.getOne({ user: { id } });
    return await this.dataServices.auth.delete({ id: auth.id });
  }
}
