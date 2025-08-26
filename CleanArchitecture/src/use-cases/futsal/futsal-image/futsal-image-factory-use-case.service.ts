import { Injectable } from '@nestjs/common';
import { CreateFutsalImageDto } from 'src/core/dtos/request/futsal-image/create-futsal-image.dto';
import { UpdateFutsalImageDto } from 'src/core/dtos/request/futsal-image/update-futsal-image.dto';
import { FutsalModel } from 'src/core/models/futsal.model';
import { FutsalCourtModel } from 'src/core/models/futsalCourt.model';
import { FutsalImageModel } from 'src/core/models/futsalImage.model';

@Injectable()
export class FutsalImageFactoryUseCaseService {
  createFutsalImage(dto: CreateFutsalImageDto) {
    const imageModel = new FutsalImageModel();
    if (dto.image) imageModel.image = dto.image;
    if (dto.futsalId) {
      const futsalModel = new FutsalModel();
      futsalModel.id = dto.futsalId;
      imageModel.futsal = futsalModel;
    }
    if (dto.courtId) {
      const courtModel = new FutsalCourtModel();
      courtModel.id = dto.courtId;
      imageModel.court = courtModel;
    }
    return imageModel;
  }

  updateFutsalImage(dto: UpdateFutsalImageDto) {
    const imageModel = new FutsalImageModel();
    if (dto.image) imageModel.image = dto.image;
    if (dto.futsalId) {
      const futsalModel = new FutsalModel();
      futsalModel.id = dto.futsalId;
      imageModel.futsal = futsalModel;
    }
    if (dto.courtId) {
      const courtModel = new FutsalCourtModel();
      courtModel.id = dto.courtId;
      imageModel.court = courtModel;
    }
    return imageModel;
  }
}
