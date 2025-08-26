import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { FutsalCourtService } from './futsal-court.service';
import { CreateFutsalCourtDto } from './dto/create-futsal-court.dto';
import { UpdateFutsalCourtDto } from './dto/update-futsal-court.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhotoUpdateDto } from '../admin/dto/photoUpdate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PriceSchemDto } from './dto/create-priceSchem.dto';
import { UploadService } from 'src/utils/file.utils';
import { Roles } from 'src/common/decorators/roles.decorator';
import { roleType } from 'src/common/constants';
import { AtGuard } from 'src/common/guards/at.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('futsal-court')
@ApiTags('Futsal Court') 
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class FutsalCourtController {
  constructor(
    private readonly futsalCourtService: FutsalCourtService,
    private uploadService:UploadService

  ) {}

  @Post()
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'create futsal court' })
  create(@Req() req: any,@Body() createFutsalCourtDto: CreateFutsalCourtDto) {
    const id=req.user.sub;
    return this.futsalCourtService.create(id,createFutsalCourtDto);
  }

  @Post('upload-photo/:courtId')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'upload photo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PhotoUpdateDto })
  @UseInterceptors(FileInterceptor('photo'))
 async upoadPhoto(
  @Param('courtId') courtId: string,
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
    const s3response = await this.uploadService.upload(file);
   return this.futsalCourtService.uploadPhoto(courtId,s3response)
  }

  @Post('price-schem/:courtId')
  createPrice(@Param('courtId') courtId:string,@Body() priceSchemDto:PriceSchemDto){
    return this.futsalCourtService.createPrice(courtId,priceSchemDto);
  }

  @Get('all/:futsalId')
  findAll(@Param('futsalId') futsalId: string) {
    return this.futsalCourtService.findAll(futsalId);
  }

  @Get(':courtId')
  findOne(@Param('courtId') courtId: string) {
    return this.futsalCourtService.findOne(courtId);
  }

  @Patch(':courtId')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'update futsal court' })
  @ApiBody({type:CreateFutsalCourtDto})
  update(@Param('courtId') courtId:string, @Body() updateFutsalCourtDto: UpdateFutsalCourtDto) {
    return this.futsalCourtService.update(courtId, updateFutsalCourtDto);
  }

  @Delete(':courtId')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'update futsal court' })
  remove(@Param('courtId') courtId:string,) {
    return this.futsalCourtService.remove(courtId);
  }
}
