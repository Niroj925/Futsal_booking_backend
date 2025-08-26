import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, Query } from '@nestjs/common';
import { FutsalService } from './futsal.service';
import { CreateFutsalDto, CreateLocationDto } from './dto/create-futsal.dto';
import { UpdateFutsalDto } from './dto/update-futsal.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhotoUpdateDto } from '../admin/dto/photoUpdate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/utils/file.utils';
import { Roles } from 'src/common/decorators/roles.decorator';
import { roleType } from 'src/common/constants';
import { AtGuard } from 'src/common/guards/at.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('futsal')
@ApiTags('Futsal')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class FutsalController {
  constructor(
    private readonly futsalService: FutsalService,
    private readonly uploadService:UploadService
  ) {}

  @Post()
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'create futsal' })
  create(@Req() req:any,@Body() createFutsalDto: CreateFutsalDto) {
    const adminId=req.user.sub;
    return this.futsalService.create(adminId,createFutsalDto);
  }

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
    const id=req.user.sub;
    const s3response = await this.uploadService.upload(file);
   return this.futsalService.uploadPhoto(id,s3response)
  }

  @Get()
  findAll() {
    return this.futsalService.findAll();
  }

  @Get('near-by-location')
  @ApiQuery({ name: 'latitude', required: true, description: 'Latitude of the location' })
  @ApiQuery({ name: 'longitude', required: true, description: 'Longitude of the location' })
  findByNear(@Query() location: { latitude: number, longitude: number }) {
    return this.futsalService.findByNear(location);
  }
  @Get('info')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'futsal info' })
  findOneInfo(@Req() req:any) {
    const id=req.user.sub;
    return this.futsalService.findOneInfo(id);
  }
  @Get('images')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'futsal info' })
  findImages(@Req() req:any) {
    const id=req.user.sub;
    return this.futsalService.findImages(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.futsalService.findOne(id);
  }

  @Patch()
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'futsal info' })
  @ApiBody({type:CreateFutsalDto})
  update(@Req() req: any, @Body() updateFutsalDto: UpdateFutsalDto) {
    const id=req.user.sub;
    return this.futsalService.update(id, updateFutsalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.futsalService.remove(+id);
  }
}
