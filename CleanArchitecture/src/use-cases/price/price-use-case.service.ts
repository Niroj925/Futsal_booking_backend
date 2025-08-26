import { Injectable } from '@nestjs/common';
import AppException from 'src/application/exception/app.exception';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import {
  AdminClsData,
  AppClsStore,
} from 'src/common/interface/app-cls-store.interface';
import { UpdateFutsalDto } from 'src/core/dtos/request/futsal/update-futsal.dto';
import { PriceFactoryUseCaseService } from './price-factory-use-case.service';
import { CreatePriceDto } from 'src/core/dtos/request/price/create-price.dto';
import { UpdatePriceDto } from 'src/core/dtos/request/price/update-price.dto';
import { FutsalModel } from 'src/core/models/futsal.model';
import { PriceModel } from 'src/core/models/price.model';

@Injectable()
export class FutsalCourtPriceUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private priceFactoryUseCaseService: PriceFactoryUseCaseService,
    private cls: IClsStore<AppClsStore>,
  ) {}

  async createFutsalCourtPrice(id: string, dto: CreatePriceDto) {
    const existingCourt = await this.dataServices.futsalCourt.getOneOrNull({
      id: dto.courtId,
    });
    if (!existingCourt) {
      throw new AppException(
        { message: 'court not found' },
        'court not found',
        409,
      );
    }
    const PriceModel = this.priceFactoryUseCaseService.createPrice({
      ...dto,
      courtId: id,
    });
    return await this.dataServices.price.create(PriceModel);
  }

  async getAllFutsalCourtPrice(): Promise<FutsalModel> {
    const adminCls = this.cls.get<AdminClsData>('admin');
    const futsal = await this.dataServices.futsal.getOne(
      {
        admin: { id: adminCls?.adminId },
      },
      {
        court: {
          price: true,
        },
      },
    );
    return futsal;
  }

  async getFutsalCourtPrice(id: string): Promise<PriceModel> {
    const futsalCourtPrice = await this.dataServices.price.getOne(
      { id },
    );
    return futsalCourtPrice;
  }

  async updateFutsalCourtPrice(id: string, dto: UpdatePriceDto) {
    const FutsalCourtPriceModel =
      this.priceFactoryUseCaseService.updatePrice(dto);
    return await this.dataServices.price.update({ id }, FutsalCourtPriceModel);
  }

  async deleteFutsalCourtPrice(id: string) {
    return await this.dataServices.price.delete({ id });
  }
}
