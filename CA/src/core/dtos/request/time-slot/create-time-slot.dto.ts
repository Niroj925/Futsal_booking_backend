import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { NormalizeTime } from 'src/application/decorators/normalize-time.decorator';
import { AvailabilityStatus } from 'src/common/enums';

export class CreateTimeSlotDto {
  @ApiProperty({
    description: 'Start time of the slot in hour',
    example: 14,
  })
  @IsNotEmpty()
  @Max(23)
  @Min(0)
  @IsNumber()
  startHr: number;

  @ApiProperty({
    description: 'Start time of the slot in minute',
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(59)
  @Min(0)
  startMin: number;

  @ApiProperty({
    description: 'End time of the slot in hour',
    example: 19,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(24)
  @Min(0)
  endHr: number;

  @ApiProperty({
    description: 'End time of the slot in minute',
    example: 15,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(59)
  @Min(0)
  endMin: number;

  @ApiProperty({
    description: 'Availability status of the court slot',
    enum: AvailabilityStatus,
    example: AvailabilityStatus.AVAILABLE,
    default: AvailabilityStatus.AVAILABLE,
  })
  @IsOptional()
  @IsEnum(AvailabilityStatus)
  status?: AvailabilityStatus;

  @ApiProperty({
    description: 'ID of the futsal this slot belongs to',
    example: 'c7b4f8b9-8d6e-4d21-b5b7-7c2a9d9e7e1f',
  })
  @IsOptional()
  futsalId?: string;
}
