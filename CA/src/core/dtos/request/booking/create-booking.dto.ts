import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingStatus } from 'src/common/enums';

export class CreateBookingDto {
  @ApiProperty({ example: '2025-08-10T10:00:00Z' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  bookingDate: Date;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsString()
  courtId: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsString()
  timeSlotId: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsString()
  priceId?: string;
}
