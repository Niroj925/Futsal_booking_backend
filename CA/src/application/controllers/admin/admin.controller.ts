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
import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import {
  AdminClsData,
  AppClsStore,
} from 'src/common/interface/app-cls-store.interface';
import { AdminIdsDto } from 'src/core/dtos/request/admin/create-admin.dto';
import { UpdateUserDto } from 'src/core/dtos/request/user/update-user.dto';
import { AdminUseCaseService } from 'src/use-cases/admin/admin-use-case.service';
import { AuthUseCaseService } from 'src/use-cases/auth/auth-use-case.service';

@Controller()
export class AdminController {
  constructor(
    private readonly cls: ClsService<AppClsStore>,
    private adminUseCaseService: AdminUseCaseService,
    private authUseCaseService: AuthUseCaseService,
  ) {}

  @Get('/me')
  async me() {
    return CoreApiResponse.success(this.cls.get<AdminClsData>('admin'));
  }

  @Get()
  @ApiQuery({ name: 'status', required: false, type: Boolean })
  async getAllOffices(@Query() query: Record<string, any>) {
    const { page, limit, ...filters } = query;

    return CoreApiResponse.pagination(
      await this.adminUseCaseService.getAllAdmin(filters),
      { page, limit },
      200,
      'All admin fetched successfully',
    );
  }

  @Get('fetch')
  async getUser() {
    return CoreApiResponse.success(
      await this.adminUseCaseService.getAdmin(),
      200,
      'admin fetched successfully',
    );
  }

  @Get('info/:id')
  async getAdminInfo(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.adminUseCaseService.getAdminById(id),
      200,
      'admin info get successfully',
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
    @Body() dto: AdminIdsDto,
    @Query('status') status: boolean,
  ) {
    return CoreApiResponse.success(
      await this.adminUseCaseService.updateAdminStatusBulk(dto, status),
      200,
      'all admin status updated successfully',
    );
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return CoreApiResponse.success(
      await this.adminUseCaseService.updateAdmin(id, dto),
      200,
      'admin updated successfully',
    );
  }

  @Delete('/:id')
  async deleteAdmin(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.adminUseCaseService.deleteAdmin(id),
      200,
      'admin deleted successfully',
    );
  }
}
