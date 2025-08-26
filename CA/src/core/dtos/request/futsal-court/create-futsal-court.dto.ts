import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { AvailabilityStatus } from 'src/common/enums';

export class CreateFutsalCourtDto {
  @ApiProperty({ example: 'Court 1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '20x40' })
  @IsNotEmpty()
  @IsString()
  dimension: string;

  @ApiProperty({ example: 'grass' })
  @IsNotEmpty()
  @IsString()
  surfaceType: string;

  @ApiProperty({ example: AvailabilityStatus.AVAILABLE, enum: AvailabilityStatus })
  @IsEnum(AvailabilityStatus)
  availability: AvailabilityStatus;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  futsalId?: string;
}
