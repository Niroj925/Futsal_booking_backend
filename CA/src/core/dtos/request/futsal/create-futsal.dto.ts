import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFutsalDto {
  @ApiProperty({ example: 'Futsal description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Kathmandu' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ example: 27.7, required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: 85.3, required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ example: '08:00' })
  @IsNotEmpty()
  @IsString()
  openAt: string;

  @ApiProperty({ example: '22:00' })
  @IsNotEmpty()
  @IsString()
  closeAt: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  adminId?: string;
}
