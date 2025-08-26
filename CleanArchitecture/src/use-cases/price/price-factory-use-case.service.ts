import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from 'src/core/dtos/request/price/create-price.dto';
import { UpdatePriceDto } from 'src/core/dtos/request/price/update-price.dto';
import { FutsalCourtModel } from 'src/core/models/futsalCourt.model';
import { PriceModel } from 'src/core/models/price.model';

@Injectable()
export class PriceFactoryUseCaseService {
  createPrice(dto: CreatePriceDto) {
    const priceModel = new PriceModel();
    if (dto.name) priceModel.name = dto.name;
    if (dto.price) priceModel.price = dto.price;
    if (dto.durationMinute) priceModel.durationMinute = dto.durationMinute;
    if (dto.courtId) {
      const courtModel = new FutsalCourtModel();
      courtModel.id = dto.courtId;
      priceModel.court = courtModel;
    }
    return priceModel;
  }

  updatePrice(dto: UpdatePriceDto) {
    const priceModel = new PriceModel();
    if (dto.name) priceModel.name = dto.name;
    if (dto.price) priceModel.price = dto.price;
    if (dto.durationMinute) priceModel.durationMinute = dto.durationMinute;
    if (dto.courtId) {
      const courtModel = new FutsalCourtModel();
      courtModel.id = dto.courtId;
      priceModel.court = courtModel;
    }
    return priceModel;
  }
}
