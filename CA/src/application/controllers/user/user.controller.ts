import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import {
  AppClsStore,
  UserClsData,
} from 'src/common/interface/app-cls-store.interface';
import {
  CreateUserDto,
  UserIdsDto,
} from 'src/core/dtos/request/user/create-user.dto';
import { UpdateUserDto } from 'src/core/dtos/request/user/update-user.dto';
import { AuthUseCaseService } from 'src/use-cases/auth/auth-use-case.service';
import { UserUseCaseService } from 'src/use-cases/user/user-use-case.service';

@Controller()
export class UserController {
  constructor(
    private readonly cls: ClsService<AppClsStore>,
    private userUseCaseService: UserUseCaseService,
    private authUseCaseService: AuthUseCaseService,
  ) {}

  @Get('/me')
  async me() {
    return CoreApiResponse.success(this.cls.get<UserClsData>('user'));
  }

  @Get()
  @ApiQuery({ name: 'status', required: false, type: Boolean })
  async getAllOffices(@Query() query: Record<string, any>) {
    const { page, limit, ...filters } = query;

    return CoreApiResponse.pagination(
      await this.userUseCaseService.getAllUsers(filters),
      { page, limit },
      200,
      'All user fetched successfully',
    );
  }

  @Get('fetch')
  async getUser() {
    return CoreApiResponse.success(
      await this.userUseCaseService.getuser(),
      200,
      'user fetched successfully',
    );
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.userUseCaseService.getUserById(id),
      200,
      'user fetched successfully',
    );
  }

  @Post('logout')
  async userLogOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = req.cookies?.accessToken;
    return CoreApiResponse.success(
      await this.authUseCaseService.logout(res, accessToken),
      200,
      'user log out successfully',
    );
  }

  @Patch('update-status-bulk')
  @ApiQuery({ name: 'status', type: Boolean })
  async updateUserStatusBulk(
    @Body() dto: UserIdsDto,
    @Query('status') status: boolean,
  ) {
    return CoreApiResponse.success(
      await this.userUseCaseService.updateUserStatusBulk(dto, status),
      200,
      'all user status updated successfully',
    );
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return CoreApiResponse.success(
      await this.userUseCaseService.updateUser(id, dto),
      200,
      'user updated successfully',
    );
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.userUseCaseService.deleteUser(id),
      200,
      'user deleted successfully',
    );
  }
}
