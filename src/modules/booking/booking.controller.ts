import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PhotoUpdateDto } from '../admin/dto/photoUpdate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/utils/file.utils';
import { Roles } from 'src/common/decorators/roles.decorator';
import { bookingStatus, paymentMethod, paymentStatus, roleType } from 'src/common/constants/index.constant';
import { AtGuard } from 'src/common/guards/at.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('booking')
@ApiTags('Booking')
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly uploadService:UploadService
  ) {}

  @Post()
  @Roles(roleType.user)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiQuery({ name: 'courtId' })
  @ApiQuery({ name: 'priceId' })
  @ApiOperation({ summary: 'booking futsal' })
  create(
    @Query() query: { courtId: string; priceId: string },
    @Req() req: any,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    const userId = req.user.sub;
    return this.bookingService.create(userId, query, createBookingDto);
  }

  @Get('find-by-status')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'find by booking status' })
  @ApiQuery({ name: 'status', enum: bookingStatus })
  findByStatus(@Req() req: any, @Query() query: { status: bookingStatus }) {
    const adminId = req.user.sub;
    return this.bookingService.findByStatus(adminId, query.status);
  }

  @Get('info/:id')
  bookingInfo(@Param('id') id: string) {
    return this.bookingService.bookingInfo(id);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Patch('booking-status/:id')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'update booking status ' })
  @ApiQuery({ name: 'status', enum: bookingStatus })
  updateStatus(
    @Param('id') id: string,
    @Query() query: { status: bookingStatus },
  ) {
    return this.bookingService.updateStatus(id, query.status);
  }

  @Patch('upload-proof/:id')
  // @Roles(roleType.user)
  // @UseGuards(AtGuard, RolesGuard)
  // @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'upload payment proof' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PhotoUpdateDto })
  @ApiQuery({name:'method',enum:paymentMethod})
  @UseInterceptors(FileInterceptor('photo'))
  async uploadProof(
    @Param('id') id:string,
    @Query('method') method:paymentMethod,
    @UploadedFile(   
      new ParseFilePipe({
        fileIsRequired:false,
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: /image\/(jpeg|png|jpg|webp)/ }),
        ],
      }),
    )
    file?: Express.Multer.File,

  ) {
    const s3response = await this.uploadService.upload(file);
    return this.bookingService.uploadProof(id,method,s3response)
  }

  @Patch('update-status/:id')
  @Roles(roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'update payment status' })
  @ApiQuery({name:'status',enum:paymentStatus})
  update( @Param('id') id:string,
  @Query('status') status:paymentStatus) {
    return this.bookingService.update(id,status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
