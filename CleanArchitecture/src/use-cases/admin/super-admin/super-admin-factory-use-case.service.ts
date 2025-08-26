import { Injectable } from '@nestjs/common';
import { CreateSuperAdminDto } from 'src/core/dtos/request/super-admin/create-super-admin.dto';
import { UpdateSuperAdminDto } from 'src/core/dtos/request/super-admin/update-super-admin.dto';
import { SuperAdminModel } from 'src/core/models/superAdmin.model';

@Injectable()
export class SuperAdminFactoryUseCaseService {
  createSuperAdmin(dto: CreateSuperAdminDto) {
    const superAdminModel = new SuperAdminModel();
    if (dto.name) superAdminModel.name = dto.name;
    if (dto.photo) superAdminModel.photo = dto.photo;
    // if (dto.authId) superAdminModel.authId = dto.authId;
    return superAdminModel;
  }

  updateSuperAdmin(dto: UpdateSuperAdminDto) {
    const superAdminModel = new SuperAdminModel();
    if (dto.name) superAdminModel.name = dto.name;
    if (dto.photo) superAdminModel.photo = dto.photo;
    // if (dto.authId) superAdminModel.authId = dto.authId;
    return superAdminModel;
  }
}
