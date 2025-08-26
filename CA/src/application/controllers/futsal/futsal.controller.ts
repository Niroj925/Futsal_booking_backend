import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import {
  AdminClsData,
  AppClsStore,
} from 'src/common/interface/app-cls-store.interface';
import { AdminIdsDto } from 'src/core/dtos/request/admin/create-admin.dto';
import { CreateFutsalCourtDto } from 'src/core/dtos/request/futsal-court/create-futsal-court.dto';
import { CreateFutsalImageDto } from 'src/core/dtos/request/futsal-image/create-futsal-image.dto';
import { CreateFutsalDto } from 'src/core/dtos/request/futsal/create-futsal.dto';
import { UpdateFutsalDto } from 'src/core/dtos/request/futsal/update-futsal.dto';
import { CreatePriceDto } from 'src/core/dtos/request/price/create-price.dto';
import { UpdatePriceDto } from 'src/core/dtos/request/price/update-price.dto';
import { UpdateUserDto } from 'src/core/dtos/request/user/update-user.dto';
import { FileUploadService } from 'src/services/file-upload/file-upload.service';
import { AuthUseCaseService } from 'src/use-cases/auth/auth-use-case.service';
import { FutsalCourtUseCaseService } from 'src/use-cases/futsal/futsal-court/futsal-court-use-case.service';
import { FutsalImageUseCaseService } from 'src/use-cases/futsal/futsal-image/futsal-image-use-case.service';
import { FutsalUseCaseService } from 'src/use-cases/futsal/futsal-use-case.service';
import { FutsalCourtPriceUseCaseService } from 'src/use-cases/price/price-use-case.service';

@Controller()
export class FutsalController {
  constructor(
    private readonly cls: ClsService<AppClsStore>,
    private futsalUsecaseService: FutsalUseCaseService,
    private futsalImageUsecaseService: FutsalImageUseCaseService,
    private futsalCourtUseCaseService: FutsalCourtUseCaseService,
    private futsalCourtPriceUseCaseService: FutsalCourtPriceUseCaseService,
    private fileUploadService: FileUploadService,
  ) {}

  @Post('create')
  async createFutsal(@Body() dto: CreateFutsalDto) {
    return CoreApiResponse.success(
      await this.futsalUsecaseService.createFutsal(dto),
      200,
      'admin futsal created successfully',
    );
  }

  @Post('create-court-price/:courtId')
  async createFutsalCourtPrice(
    @Param('courtId') id: string,
    @Body() dto: CreatePriceDto,
  ) {
    return CoreApiResponse.success(
      await this.futsalCourtPriceUseCaseService.createFutsalCourtPrice(id, dto),
      200,
      'futsal court price created successfully',
    );
  }

  @Post('create-court')
  async createFutsalCourt(@Body() dto: CreateFutsalCourtDto) {
    return CoreApiResponse.success(
      await this.futsalCourtUseCaseService.createFutsalCourt(dto),
      200,
      'futsal court created successfully',
    );
  }

  @Post('create-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async createFutsalImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFutsalImageDto,
  ) {
    if (!file) {
      throw new NotFoundException('No file provided');
    }

    const result = await this.fileUploadService.uploadFile(file.buffer);
    // return {
    //   success: true,
    //   data: result,
    //   message: 'File uploaded successfully',
    // };

    return CoreApiResponse.success(
      await this.futsalImageUsecaseService.createFutsalImage({
        image: result.url,
      }),
      200,
      'futsal image created successfully',
    );
  }

  @Post('create-court-image')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async createCourtImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFutsalImageDto,
  ) {
    if (!file) {
      throw new NotFoundException('No file provided');
    }
    const result = await this.fileUploadService.uploadFile(file.buffer);

    return CoreApiResponse.success(
      await this.futsalCourtUseCaseService.createCourtImage({
        image: result.url,
        courtId: dto.courtId,
      }),
      200,
      'futsal image created successfully',
    );
  }

  @Get('image')
  async getAllFutsalImages() {
    return CoreApiResponse.success(
      await this.futsalImageUsecaseService.getAllFutsalImages(),
      200,
      ' futsal images get successfully',
    );
  }

  @Get('futsal-info')
  async getFutsalInfo() {
    return CoreApiResponse.success(
      await this.futsalCourtUseCaseService.getFutsalInfo(),
      200,
      ' futsal info get successfully',
    );
  }

  @Get('futsal-court/:id')
  async getFutsalCourt(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.futsalCourtUseCaseService.getFutsalCourt(id),
      200,
      ' futsal court images get successfully',
    );
  }

  @Get('court-price/:id')
  async getFutsalCourtPrice(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.futsalCourtPriceUseCaseService.getFutsalCourtPrice(id),
      200,
      ' futsal court price get successfully',
    );
  }

  @Get('futsal-court-price')
  async getAllFutsalCourtPrice() {
    return CoreApiResponse.success(
      await this.futsalCourtPriceUseCaseService.getAllFutsalCourtPrice(),
      200,
      ' futsal court price get successfully',
    );
  }

  @Get('info')
  async getAdminInfo() {
    return CoreApiResponse.success(
      await this.futsalUsecaseService.getFutsal(),
      200,
      'admin futsal info get successfully',
    );
  }

  @Patch('court-price/:id')
  async updateFutsalCourtPrice(
    @Param('id') id: string,
    @Body() dto: UpdatePriceDto,
  ) {
    return CoreApiResponse.success(
      await this.futsalCourtPriceUseCaseService.updateFutsalCourtPrice(id, dto),
      200,
      'futsal court price updated successfully',
    );
  }

  @Patch()
  async updateUser(@Body() dto: UpdateFutsalDto) {
    return CoreApiResponse.success(
      await this.futsalUsecaseService.updateFutsal(dto),
      200,
      'admin futsal updated successfully',
    );
  }

  @Delete('image/:id')
  async deleteFutsalImage(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.futsalImageUsecaseService.deleteFutsalImage(id),
      200,
      ' futsal image deleted successfully',
    );
  }

  @Delete('court-image/:id')
  async deleteCourtImage(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.futsalCourtUseCaseService.deleteCourtImage(id),
      200,
      ' futsal court image deleted successfully',
    );
  }

  @Delete('court-price/:id')
  async deleteCourtPrice(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.futsalCourtPriceUseCaseService.deleteFutsalCourtPrice(id),
      200,
      ' futsal court price deleted successfully',
    );
  }
  @Delete('court/:id')
  async deleteFutsalCourt(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.futsalUsecaseService.deleteFutsalCourt(id),
      200,
      ' futsal court deleted successfully',
    );
  }

  @Delete('/:id')
  async deleteAdmin(@Param('id') id: string) {
    return CoreApiResponse.success(
      await this.futsalUsecaseService.deleteFutsal(id),
      200,
      'admin futsal deleted successfully',
    );
  }
}
