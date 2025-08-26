import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import AppUnauthorizedException from '../exception/app-unauthorized.exception';
import { IS_USER_KEY } from '../decorators/user.decorator';
import { RoleType } from 'src/common/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _jwtService: IJwtService,
    private _reflector: Reflector,
    private readonly cls: IClsStore<AppClsStore>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { url: requestUrl } = request;

    // if is public set isPublic to true and return
    const isPublic =
      this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ||
        requestUrl.startsWith('/api/public') ||
        requestUrl.startsWith('/api/auth')
        ? true
        : false;
    if (isPublic) {
      this.cls.set('isPublic', true);
      return true;
    }

    const isUser =
      this._reflector.getAllAndOverride<boolean>(IS_USER_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || requestUrl.startsWith('/api')
        ? true
        : false;

    this.cls.set('isPublic', isPublic);
    this.cls.set('isUser', isUser);

    if (isPublic) {
      return true;
    }
    if (isUser) {
      const token = this.extractTokenFromCookie(request);
      if (!token || token === 'null' || token === 'undefined') {
        throw new AppUnauthorizedException(
          'Invalid token. Please login again.',
        );
      } else {
        try {
          const payload: any = await this._jwtService.checkToken<any>(
            token.trim(),
          );
          if (!payload) {
            throw new AppUnauthorizedException(
              'Invalid token. Please login again.',
            );
          }
          this.cls.set('payload', payload);
          payload.role == RoleType.USER
            ? this.cls.set('user', {
              email: payload.sub,
              userId: payload.userId,
              roles: Array.isArray(payload.roles) ? payload.roles : [payload.role],
            })
            : this.cls.set('admin', {
              email: payload.sub,
              adminId: payload.adminId,
              roles: Array.isArray(payload.roles) ? payload.roles : [payload.role],
            });
          return true;
        } catch (error) {
          throw new AppUnauthorizedException(JSON.stringify(error));
        }
      }
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.accessToken;
  }
}
