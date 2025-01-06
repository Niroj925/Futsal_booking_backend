import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { roleType } from 'src/common/constants/index.constant';
import { AtGuard } from 'src/common/guards/at.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';


@Controller('super-admin')
@ApiTags('Super Admin')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @Post('account')
  @ApiOperation({ summary: 'Create a superAdmin Account' })
  createSuperAdmin(@Body() createAuthDto:CreateAuthDto ) {
    return this.superAdminService.createSuperAdmin(createAuthDto);
  }

  @Post('futsal-account')
  @Roles(roleType.superAdmin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'create futsal Account' })
  createRestaurant(@Body() createAuthDto: CreateAuthDto) {
    return this.superAdminService.createRestaurant(createAuthDto);
  }


  @Get()
  findAll() {
    return this.superAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superAdminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuperAdminDto: UpdateSuperAdminDto) {
    return this.superAdminService.update(+id, updateSuperAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superAdminService.remove(+id);
  }
}
