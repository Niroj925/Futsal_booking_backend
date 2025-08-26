import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from 'src/common/enums';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @ApiProperty({ example: BookingStatus.APPROVED })
    @IsOptional()
    @IsEnum(BookingStatus)
    status?: BookingStatus;
}
