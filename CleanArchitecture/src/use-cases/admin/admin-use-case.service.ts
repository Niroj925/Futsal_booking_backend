import { Injectable } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import { IDataServices } from 'src/core/abstracts';
import { IBcryptService } from 'src/core/abstracts/adapters/bcrypt.abstract';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
import { AdminFactoryUseCaseService } from './admin-factory-use-case.service';
import { AuthFactoryUseCaseService } from '../auth/auth-factory-use-case.service';
import { RoleType } from 'src/common/enums';
import { IPaginationData } from 'src/common/interface/response/response-data.interface';
import { AdminModel } from 'src/core/models/admin.model';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import {
  AdminClsData,
  AppClsStore,
} from 'src/common/interface/app-cls-store.interface';
import { AdminIdsDto, CreateAdminDto } from 'src/core/dtos/request/admin/create-admin.dto';
import { CreateUserDto } from 'src/core/dtos/request/user/create-user.dto';
import { UpdateAdminDto } from 'src/core/dtos/request/admin/update-admin.dto';
import { UpdateUserDto } from 'src/core/dtos/request/user/update-user.dto';

@Injectable()
export class AdminUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private bcryptService: IBcryptService,
    private adminFactoryUseCaseService: AdminFactoryUseCaseService,
    private authFactoryUseCaseService: AuthFactoryUseCaseService,
    private cls: IClsStore<AppClsStore>,
  ) {}

  async adminSignUp(dto: CreateUserDto) {
    const existingadmin = await this.dataServices.auth.getOneOrNull({
      email: dto.email,
    });
    if (existingadmin) {
      throw new AppException(
        { message: 'admin with this email already exists' },
        'admin with this email already exists',
        409,
      );
    }

    return await this.dataServices.transaction(async (manager) => {
      const AdminModel = this.adminFactoryUseCaseService.createAdmin(dto);
      const newAdmin = await this.dataServices.admin.create(
        AdminModel,
        manager,
      );
      const adminAuthModel = this.authFactoryUseCaseService.createAuth({
        adminId: newAdmin.id,
        email: dto.email,
        role: RoleType.ADMIN,
        password: await this.bcryptService.hash(dto.password),
      });

      await this.dataServices.auth.create(adminAuthModel, manager);
    });
  }

  async getAllAdmin(
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

    const response = await this.dataServices.admin.getAll(
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

    const parseData = response.data.map((admin) => {
      return {
        id: admin.id,
        name: admin.name,
        contact: admin.contact,
        email: admin.auth.email,
        status: admin.status,
      };
    });

    return {
      ...response,
      data: parseData,
    };
  }

  async getAdmin(): Promise<AdminModel> {
    const adminCls = this.cls.get<AdminClsData>('admin');
    const admin = await this.dataServices.admin.getOne(
      {
        id: adminCls?.adminId,
      },
      {
        auth: true,
      },
      {
        id: true,
        name: true,
        contact: true,
        auth: {
          admin: true,
        },
        status: true,
      },
    );
    return admin;
  }

  async getAdminById(adminId: string): Promise<AdminModel> {
    const admin = await this.dataServices.admin.getOne(
      {
        id: adminId,
      },
      {
        auth: true,
      },
      {
        id: true,
        name: true,
        contact: true,
        auth: {
          admin: true,
        },
        status: true,
      },
    );
    return admin;
  }

  async updateAdmin(id: string, dto: UpdateUserDto) {
    return await this.dataServices.transaction(async (manager) => {
      const auth = await this.dataServices.auth.getOne({ admin: { id } });
      const adminModel = this.adminFactoryUseCaseService.updateAdmin(dto);
      await this.dataServices.admin.update({ id }, adminModel, manager);

      const authModel = this.authFactoryUseCaseService.updateAuth(dto);

      await this.dataServices.auth.update({ id: auth.id }, authModel, manager);
    });
  }

  async updateAdminStatusBulk(dto: AdminIdsDto, status: boolean) {
    return await Promise.all(
      dto.adminIds.map(async (id) => {
        const adminModel = this.adminFactoryUseCaseService.updateAdmin({
          status,
        });
        await this.dataServices.admin.update({ id }, adminModel);
        return true;
      }),
    );
  }

  async deleteAdmin(id: string) {
    const auth = await this.dataServices.auth.getOne({ admin: { id } });
    return await this.dataServices.auth.delete({ id: auth.id });
  }
}
