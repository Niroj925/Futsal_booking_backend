import { Injectable } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import {
  AdminClsData,
  AppClsStore,
} from 'src/common/interface/app-cls-store.interface';
import { error } from 'console';
import { FutsalCourtFactoryUseCaseService } from './futsal-court-factory-use-case.service';
import { CreateFutsalCourtDto } from 'src/core/dtos/request/futsal-court/create-futsal-court.dto';
import { FutsalImageFactoryUseCaseService } from '../futsal-image/futsal-image-factory-use-case.service';
import { CreateFutsalImageDto } from 'src/core/dtos/request/futsal-image/create-futsal-image.dto';

@Injectable()
export class FutsalCourtUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private futsalCourtFactoryUseCaseService: FutsalCourtFactoryUseCaseService,
    private futsalImageFactoryUseCaseService: FutsalImageFactoryUseCaseService,

    private cls: IClsStore<AppClsStore>,
  ) {}

  async createFutsalCourt(dto: CreateFutsalCourtDto) {
    const adminCls = this.cls.get<AdminClsData>('admin');
    if (!adminCls) {
      throw new error('admin not loggedIn');
    }
    const futsal = await this.dataServices.futsal.getOne({
      admin: { id: adminCls?.adminId },
    });
    const futsalCourtModel =
      this.futsalCourtFactoryUseCaseService.createFutsalCourt({
        ...dto,
        futsalId: futsal?.id,
      });
    return await this.dataServices.futsalCourt.create(futsalCourtModel);
  }

  async createCourtImage(dto: CreateFutsalImageDto) {
    const FutsalImageModel =
      this.futsalImageFactoryUseCaseService.createFutsalImage(dto);
    return await this.dataServices.futsalImage.create(FutsalImageModel);
  }

  async deleteCourtImage(id: string) {
    return await this.dataServices.futsalImage.delete({ id });
  }

  async getFutsalCourt(id: string) {
    return await this.dataServices.futsalCourt.getOne({ id }, { image: true });
  }

  async getFutsalInfo() {
    const adminCls = this.cls.get<AdminClsData>('admin');
    if (!adminCls) {
      throw new error('admin not loggedIn');
    }
    const futsal = await this.dataServices.futsal.getOne(
      {
        admin: { id: adminCls?.adminId },
      },
      {
        court: {
          image: true,
        },
      },
    );
    return futsal;
  }

  async futsalCourt(id: string) {
    return await this.dataServices.futsalImage.delete({ id });
  }
}
