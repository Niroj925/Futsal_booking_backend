import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from 'src/core/dtos/request/admin/create-admin.dto';
import { UpdateAdminDto } from 'src/core/dtos/request/admin/update-admin.dto';
import { AdminModel } from 'src/core/models/admin.model';

@Injectable()
export class AdminFactoryUseCaseService {
  createAdmin(dto: CreateAdminDto) {
    const adminModel = new AdminModel();
    if (dto.name) adminModel.name = dto.name;
    if (dto.contact) adminModel.contact = dto.contact;
    if (dto.photo) adminModel.photo = dto.photo;
    return adminModel;
  }

  updateAdmin(dto: UpdateAdminDto) {
    const adminModel = new AdminModel();
    if (dto.name) adminModel.name = dto.name;
    if (dto.contact) adminModel.contact = dto.contact;
    if (dto.status != undefined) adminModel.status = dto.status;
    if (dto.photo) adminModel.photo = dto.photo;
    return adminModel;
  }
}
