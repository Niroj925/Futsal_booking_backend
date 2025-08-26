import { Injectable } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import {
  AdminClsData,
  AppClsStore,
} from 'src/common/interface/app-cls-store.interface';
import { error } from 'console';
import { CreateFutsalDto } from 'src/core/dtos/request/futsal/create-futsal.dto';
import { FutsalImageFactoryUseCaseService } from './futsal-image-factory-use-case.service';
import { CreateFutsalImageDto } from 'src/core/dtos/request/futsal-image/create-futsal-image.dto';

@Injectable()
export class FutsalImageUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private futsalImageFactoryUseCaseService: FutsalImageFactoryUseCaseService,
    private cls: IClsStore<AppClsStore>,
  ) {}

  async createFutsalImage(dto: CreateFutsalImageDto) {
    const adminCls = this.cls.get<AdminClsData>('admin');
    if (!adminCls) {
      throw new error('admin not loggedIn');
    }
    const futsal = await this.dataServices.futsal.getOne({
      admin: { id: adminCls?.adminId },
    });

    const FutsalImageModel =
      this.futsalImageFactoryUseCaseService.createFutsalImage({
        ...dto,
        futsalId: futsal?.id,
      });
    return await this.dataServices.futsalImage.create(FutsalImageModel);
  }

  async getAllFutsalImages() {
    const adminCls = this.cls.get<AdminClsData>('admin');
    if (!adminCls) {
      throw new error('admin not loggedIn');
    }
    const futsal = await this.dataServices.futsal.getOne(
      {
        admin: { id: adminCls?.adminId },
      },
      {
        image: true,
      },
      {
        id:true,
        image:{
          id:true,
          image:true
        }
      }
    );
    return futsal?.image;
  }

  async deleteFutsalImage(id: string) {
    return await this.dataServices.futsalImage.delete({ id });
  }
}
