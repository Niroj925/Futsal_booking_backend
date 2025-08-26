import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/core/dtos/request/user/create-user.dto';
import { UpdateUserDto } from 'src/core/dtos/request/user/update-user.dto';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class UserFactoryUseCaseService {
  createUser(dto: CreateUserDto) {
    const userModel = new UserModel();
    if (dto.name) userModel.name = dto.name;
    if (dto.address) userModel.address = dto.address;
    if (dto.contact) userModel.contact = dto.contact;
    if (dto.photo) userModel.photo = dto.photo;
    return userModel;
  }

  updateUser(dto: UpdateUserDto) {
    const userModel = new UserModel();
    if (dto.name) userModel.name = dto.name;
    if (dto.address) userModel.address = dto.address;
    if (dto.contact) userModel.contact = dto.contact;
    if (dto.photo) userModel.photo = dto.photo;
    if (dto.status!=undefined) userModel.status = dto.status;
    return userModel;
  }
}
