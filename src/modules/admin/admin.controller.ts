import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req, UploadedFile, ParseFilePipe, FileTypeValidator, UseGuards, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhotoUpdateDto } from './dto/photoUpdate.dto';
import { UploadService } from 'src/utils/file.utils';
import { Roles } from 'src/common/decorators/roles.decorator';
import { roleType } from 'src/common/constants/index.constant';
import { AtGuard } from 'src/common/guards/at.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('admin')
@ApiTags('Admin')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly uploadService:UploadService
  ) {}

  @Post('upload-photo')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'upload photo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PhotoUpdateDto })
  @UseInterceptors(FileInterceptor('photo'))
 async upoadPhoto(
    @Req() req:any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png|jpg|webp)/ }),
        ],
      }),
    )
    file?: Express.Multer.File,

  ){
    const id = req.user.sub;
    const s3response = await this.uploadService.upload(file);
   return this.adminService.uploadPhoto(id,s3response)
  }


  @Get('all-admin')
  findAll(@Query() paginationDto:PaginationDto) {
    return this.adminService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch()
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'update admin' })
  @ApiBody({type:CreateAdminDto})
  update(@Req() req: any, @Body() updateAdminDto: UpdateAdminDto) {
    const id=req.user.sub;
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':adminId')
  @Roles(roleType.superAdmin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'delete admin' })
  remove(@Param('adminId') adminId: string) {
    return this.adminService.remove(adminId);
  }
}
