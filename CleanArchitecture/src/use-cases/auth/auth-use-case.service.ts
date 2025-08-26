import { ConfigService } from '@nestjs/config';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { JwtTokenService } from 'src/services/jwt/jwt.service';
import { AuthFactoryUseCaseService } from './auth-factory-use-case.service';
import {
  AuthDto,
  CreatAuthDto,
} from 'src/core/dtos/request/auth/create-auth.dto';
import AppException from 'src/application/exception/app.exception';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
import { IBcryptService } from 'src/core/abstracts/adapters/bcrypt.abstract';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { RoleType } from 'src/common/enums';

@Injectable()
export class AuthUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private configService: ConfigService,
    private jwtTokenService: JwtTokenService,
    private bcryptService: IBcryptService,
    private jwtService: IJwtService,
    private cls: IClsStore<AppClsStore>,
    private authFactoryUseCaseService: AuthFactoryUseCaseService,
  ) { }

  async signIn(dto: AuthDto, res: Response) {
    const authUser = await this.dataServices.auth.getOneOrNull(
      {
        email: dto.email,
      },
      { user: true, admin: true },
    );

    if (!authUser) {
      throw new AppException(
        { message: 'user with this email does not exist' },
        'User does not exist',
        404,
      );
    }

    const isPasswordValid = await this.bcryptService.compare(
      dto.password,
      authUser.password,
    );
    if (!isPasswordValid) {
      throw new AppException(
        { message: 'invalid password' },
        'Invalid Password',
        401,
      );
    }

    const payload = {
      sub: authUser.email,
      userId: authUser?.user?.id,
      adminId: authUser?.admin?.id,
      role: authUser.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.createToken(payload),
      this.jwtService.createRefreshToken(payload),
    ]);

    const authModel = this.authFactoryUseCaseService.updateAuth({
      rToken: refreshToken,
    });

    await this.dataServices.auth.update({ id: authUser.id }, authModel);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(req: Request, res: Response) {
    const existingRefreshToken = req.cookies?.refreshToken;

    if (!existingRefreshToken) {
      throw new AppException(
        { message: 'missing refresh token' },
        'unauthorized',
        401,
      );
    }

    const valid = await this.jwtService.checkToken(existingRefreshToken);
    if (!valid) {
      throw new AppException(
        { message: 'refresh token invalid or expired' },
        'Invalid Refresh Token',
        401,
      );
    }

    const decoded = await this.jwtService.checkToken<any>(existingRefreshToken);
    const payload = {
      sub: decoded.sub,
      userId: decoded?.userId,
      adminId: decoded?.adminId,
      role: decoded.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.createToken(payload),
      this.jwtService.createRefreshToken(payload),
    ]);

    const authUser = await this.dataServices.auth.getOneOrNull({
      user: { id: decoded.userId },
    });
    if (!authUser) {
      throw new AppException(
        { message: 'user not found' },
        'User not found',
        404,
      );
    }

    await this.dataServices.auth.update(
      { id: authUser.id },
      { rToken: refreshToken },
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    return res.status(200).json({
      success: true,
      message: 'Access token refreshed successfully',
    });
  }

  async logout(res: Response, accessToken: string) {
    const decoded = await this.jwtService.checkToken<any>(accessToken);
    const user =
      decoded.role == RoleType.USER
        ? await this.dataServices.user.getOneOrNull(
          {
            id: decoded.userId,
          },
          {
            auth: true,
          },
        )
        : await this.dataServices.admin.getOneOrNull(
          {
            id: decoded.adminId,
          },
          {
            auth: true,
          },
        );

    if (!user?.auth) {
      throw new Error('user not found');
    }
    const authModel = this.authFactoryUseCaseService.updateAuth({
      rToken: null,
    });

    await this.dataServices.auth.update({ id: user?.auth.id }, authModel);
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.json({
      success: true,
      message: 'Tokens refreshed successfully',
    });
  }
}
