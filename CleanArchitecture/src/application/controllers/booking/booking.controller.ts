import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { Roles } from 'src/application/decorators/roles.decorator';
import AppException from 'src/application/exception/app.exception';
import { RolesGuard } from 'src/application/guards/role.guard';
import { BookingStatus, PaymentStatus, RoleType } from 'src/common/enums';
import { CreateBookingDto } from 'src/core/dtos/request/booking/create-booking.dto';
import { UpdateBookingDto } from 'src/core/dtos/request/booking/update-booking.dto';
import { CreateMakePaymentDto, UpdatePaymentDto } from 'src/core/dtos/request/payment/update-payment.dto';
import { FileUploadService } from 'src/services/file-upload/file-upload.service';
import { BookingUseCaseService } from 'src/use-cases/booking/booking-use-case.service';

@Controller()
export class BookingController {
    constructor(
        private bookingUseCaseService: BookingUseCaseService,
        private fileUploadService: FileUploadService,
    ) { }

    @Post('create')
    async createFutsalTimeSlot(@Body() dto: CreateBookingDto) {
        return CoreApiResponse.success(
            await this.bookingUseCaseService.createBooking(dto),
            200,
            'booking created successfully',
        );
    }

    @Get('all-booking')
    @Roles(RoleType.ADMIN)
    @UseGuards(RolesGuard)
    @ApiQuery({ name: 'status', required: false, enum: BookingStatus })
    async getAllFutsalTimeSlot(@Query() query: Record<string, any>) {
        const { page, limit, ...filters } = query;

        return CoreApiResponse.pagination(
            await this.bookingUseCaseService.getAllBookingSlot(filters),
            { page, limit },
            200,
            'Booking fetched successfully',
        );
    }

    @Get('/:bookingId')
    async getBooking(@Param('bookingId') id: string) {
        return CoreApiResponse.success(
            await this.bookingUseCaseService.getBooking(id),
            200,
            'booking successfully',
        );
    }

    @Patch('status-update/:bookingId')
    @ApiQuery({ name: 'status', enum: BookingStatus })
    async updateBookingStatus(
        @Query('status') status: BookingStatus,
        @Param('bookingId') id: string,
    ) {
        return CoreApiResponse.success(
            await this.bookingUseCaseService.updateBookingStatus(id, status),
            200,
            'booking status updated successfully',
        );
    }

    @Post('make-payment')
    @UseGuards(RolesGuard)
    @Roles(RoleType.USER)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('proof'))
    async createFutsalImage(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateMakePaymentDto,
    ) {
        if (!file) {
            throw new AppException('No file provided');
        }

        const result = await this.fileUploadService.uploadFile(file.buffer);

        return CoreApiResponse.success(
            await this.bookingUseCaseService.makeBookingPayment(
                dto,
                result.url,
            ),
            200,
            'booking payment created successfully',
        );
    }

    @Patch('update-payment-status')
    async updateBookingPaymentStatus(
        @Body() dto: UpdatePaymentDto,
    ) {
        return CoreApiResponse.success(
            await this.bookingUseCaseService.updatePaymentStatus(dto),
            200,
            'booking payment updated successfully',
        );
    }


    @Patch('/:bookingId')
    async updateBooking(
        @Param('bookingId') id: string,
        @Body() dto: UpdateBookingDto,
    ) {
        return CoreApiResponse.success(
            await this.bookingUseCaseService.updateBooking(id, dto),
            200,
            'booking updated successfully',
        );
    }

    @Delete('/:id')
    async deleteBooking(@Param('bookingId') id: string) {
        return CoreApiResponse.success(
            await this.bookingUseCaseService.deleteBooking(id),
            200,
            'booking deleted successfully',
        );
    }
}
