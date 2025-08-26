import { Injectable } from '@nestjs/common';
import { CreateFutsalCourtDto } from 'src/core/dtos/request/futsal-court/create-futsal-court.dto';
import { UpdateFutsalCourtDto } from 'src/core/dtos/request/futsal-court/update-futsal-court.dto';
import { FutsalModel } from 'src/core/models/futsal.model';
import { FutsalCourtModel } from 'src/core/models/futsalCourt.model';

@Injectable()
export class FutsalCourtFactoryUseCaseService {
  createFutsalCourt(dto: CreateFutsalCourtDto) {
    const courtModel = new FutsalCourtModel();
    if (dto.name) courtModel.name = dto.name;
    if (dto.dimension) courtModel.dimension = dto.dimension;
    if (dto.surfaceType) courtModel.surfaceType = dto.surfaceType;
    if (dto.availability) courtModel.availability = dto.availability;
    if (dto.futsalId) {
      const futsalModel = new FutsalModel();
      futsalModel.id = dto.futsalId;
      courtModel.futsal = futsalModel;
    }
    return courtModel;
  }

  updateFutsalCourt(dto: UpdateFutsalCourtDto) {
    const courtModel = new FutsalCourtModel();
    if (dto.name) courtModel.name = dto.name;
    if (dto.dimension) courtModel.dimension = dto.dimension;
    if (dto.surfaceType) courtModel.surfaceType = dto.surfaceType;
    if (dto.availability) courtModel.availability = dto.availability;
    if (dto.futsalId) {
      const futsalModel = new FutsalModel();
      futsalModel.id = dto.futsalId;
      courtModel.futsal = futsalModel;
    }
    return courtModel;
  }
}
