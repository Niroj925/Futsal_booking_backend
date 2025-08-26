import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty({ example: 'Standard Price', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 1000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 60 })
  @IsNotEmpty()
  @IsNumber()
  durationMinute: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  courtId?: string;
}
