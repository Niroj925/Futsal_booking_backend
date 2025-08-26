import { Injectable } from '@nestjs/common';
import {
  AuthDto,
  CreatAuthDto,
} from 'src/core/dtos/request/auth/create-auth.dto';
import {
  UpdateAuthDto,
  UpdateuserAuthDto,
} from 'src/core/dtos/request/auth/update-auth.dto';
import { AdminModel } from 'src/core/models/admin.model';
import { AuthModel } from 'src/core/models/auth.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class AuthFactoryUseCaseService {
  createAuth(dto: CreatAuthDto) {
    const authModel = new AuthModel();
    if (dto.email) authModel.email = dto.email;
    if (dto.password) authModel.password = dto.password;
    if (dto.role) authModel.role = dto.role;
    if (dto.userId) {
      const userModel = new UserModel();
      userModel.id = dto.userId;
      authModel.user = userModel;
    }
    if (dto.adminId) {
      const adminModel = new AdminModel();
      adminModel.id = dto.adminId;
      authModel.admin = adminModel;
    }

    return authModel;
  }

  updateAuth(dto: UpdateuserAuthDto) {
    const authModel = new AuthModel();
    if (dto.email) authModel.email = dto.email;
    if (dto.password) authModel.password = dto.password;
    // if (dto.role) authModel.role = dto.role;
    if ('rToken' in dto) {
      authModel.rToken = dto.rToken;
    }
    if (dto.rToken) authModel.rToken = dto.rToken;
    return authModel;
  }
}
