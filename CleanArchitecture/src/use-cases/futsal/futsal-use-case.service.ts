import { Injectable } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import {
  AdminClsData,
  AppClsStore,
} from 'src/common/interface/app-cls-store.interface';
import { FutsalFactoryUseCaseService } from './futsal-factory-use-case.service';
import { error } from 'console';
import { CreateFutsalDto } from 'src/core/dtos/request/futsal/create-futsal.dto';
import { FutsalModel } from 'src/core/models/futsal.model';
import { UpdateFutsalDto } from 'src/core/dtos/request/futsal/update-futsal.dto';

@Injectable()
export class FutsalUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private futsalFactoryUseCaseService: FutsalFactoryUseCaseService,
    private cls: IClsStore<AppClsStore>,
  ) {}

  async createFutsal(dto: CreateFutsalDto) {
    const adminCls = this.cls.get<AdminClsData>('admin');
    if (!adminCls) {
      throw new error('admin not loggedIn');
    }
    const existingadmin = await this.dataServices.auth.getOneOrNull({
      email: adminCls.email,
    });
    if (!existingadmin) {
      throw new AppException(
        { message: 'admin with this email not found' },
        'admin with this email not found',
        409,
      );
    }
    const FutsalModel = this.futsalFactoryUseCaseService.createFutsal({
      ...dto,
      adminId: adminCls?.adminId,
    });
    return await this.dataServices.futsal.create(FutsalModel);
  }

  async getFutsal(): Promise<FutsalModel> {
    const adminCls = this.cls.get<AdminClsData>('admin');
    const futsal = await this.dataServices.futsal.getOne(
      {
        admin: { id: adminCls?.adminId },
      },
      {
        admin: true,
      },
    );
    return futsal;
  }

  async getFutsalById(futsalId: string): Promise<FutsalModel> {
    const admin = await this.dataServices.futsal.getOne(
      {
        id: futsalId,
      },
      {
        admin: true,
      },
    );
    return admin;
  }

  async updateFutsal(dto: UpdateFutsalDto) {
    const futsal = await this.getFutsal();
    const FutsalModel = this.futsalFactoryUseCaseService.updateFutsal(dto);
    return await this.dataServices.futsal.update(
      { id: futsal?.id },
      FutsalModel,
    );
  }

  async deleteFutsal(id: string) {
    return await this.dataServices.futsal.delete({ id });
  }

  async deleteFutsalCourt(id: string) {
    return await this.dataServices.futsalCourt.delete({ id });
  }
}
