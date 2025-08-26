import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import {
  AdminClsData,
  AppClsStore,
  UserClsData,
} from 'src/common/interface/app-cls-store.interface';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import AppUnauthorizedException from '../exception/app-unauthorized.exception';
import { IDataServices } from 'src/core/abstracts';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly cls: IClsStore<AppClsStore>,
    private readonly dataServices: IDataServices,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.cls.get<boolean>('isPublic');
    if (isPublic) {
      return true;
    }
    // Retrieve roles requirement from metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const clsData = this.cls.get<AdminClsData>('admin')
      || this.cls.get<UserClsData>('user');

    const userRoles = clsData?.roles || [];

    if (!userRoles?.length) {
      throw new AppUnauthorizedException('Missing user roles in context.');
    }

    const isAuthorized = requiredRoles.some((role) => userRoles.includes(role));

    if (!isAuthorized) {
      throw new AppUnauthorizedException('You are not assigned to this resource.');
    }

    return true;

  }
}
