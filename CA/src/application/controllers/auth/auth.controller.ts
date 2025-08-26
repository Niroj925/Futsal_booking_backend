import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { AppClsStore } from 'src/common/interface/app-cls-store.interface';
import { CreateAdminDto } from 'src/core/dtos/request/admin/create-admin.dto';
import { AuthDto } from 'src/core/dtos/request/auth/create-auth.dto';
import { CreateUserDto } from 'src/core/dtos/request/user/create-user.dto';
import { AdminUseCaseService } from 'src/use-cases/admin/admin-use-case.service';
import { AuthUseCaseService } from 'src/use-cases/auth/auth-use-case.service';
import { UserUseCaseService } from 'src/use-cases/user/user-use-case.service';

@Controller()
export class AuthController {
  constructor(
    // private readonly cls:ClsService<AppClsStore>,
    private userUseCaseService: UserUseCaseService,
    private authUseCaseService: AuthUseCaseService,
    private adminUseCaseService: AdminUseCaseService,
  ) {}

  @Post('signin')
  async userSignIn(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return CoreApiResponse.success(
      await this.authUseCaseService.signIn(dto, res),
      200,
      'user sign in successfully',
    );
  }

  @Post('admin-signup')
  async adminSignUp(@Body() dto: CreateUserDto) {
    return CoreApiResponse.success(
      await this.adminUseCaseService.adminSignUp(dto),
      200,
      'admin created successfully',
    );
  }

  @Post('user-signup')
  async userSignUp(@Body() dto: CreateUserDto) {
    return CoreApiResponse.success(
      await this.userUseCaseService.userSignUp(dto),
      200,
      'user created successfully',
    );
  }
  @Post('refresh-token')
  async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    return CoreApiResponse.success(
      await this.authUseCaseService.refreshAccessToken(req, res),
      200,
      'access token refreshed successfully',
    );
  }

  @Get()
  async getAllUsers() {
    return CoreApiResponse.success(
      await this.userUseCaseService.getAllUsers(),
      200,
      'all user fetched successfully',
    );
  }
}
