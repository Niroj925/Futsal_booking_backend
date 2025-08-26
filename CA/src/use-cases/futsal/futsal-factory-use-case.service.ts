import { Injectable } from '@nestjs/common';
import { CreateFutsalDto } from 'src/core/dtos/request/futsal/create-futsal.dto';
import { UpdateFutsalDto } from 'src/core/dtos/request/futsal/update-futsal.dto';
import { AdminModel } from 'src/core/models/admin.model';
import { FutsalModel } from 'src/core/models/futsal.model';

@Injectable()
export class FutsalFactoryUseCaseService {
  createFutsal(dto: CreateFutsalDto) {
    const futsalModel = new FutsalModel();
    if (dto.description) futsalModel.description = dto.description;
    if (dto.location) futsalModel.location = dto.location;
    if (dto.latitude) futsalModel.latitude = dto.latitude;
    if (dto.longitude) futsalModel.longitude = dto.longitude;
    if (dto.openAt) futsalModel.openAt = dto.openAt;
    if (dto.closeAt) futsalModel.closeAt = dto.closeAt;
    if(dto.adminId){
      const adminModel=new AdminModel();
      adminModel.id=dto.adminId;
      futsalModel.admin=adminModel;
    }
    return futsalModel;
  }

  updateFutsal(dto: UpdateFutsalDto) {
    const futsalModel = new FutsalModel();
    if (dto.description) futsalModel.description = dto.description;
    if (dto.location) futsalModel.location = dto.location;
    if (dto.latitude) futsalModel.latitude = dto.latitude;
    if (dto.longitude) futsalModel.longitude = dto.longitude;
    if (dto.openAt) futsalModel.openAt = dto.openAt;
    if (dto.closeAt) futsalModel.closeAt = dto.closeAt;
    return futsalModel;
  }
}
