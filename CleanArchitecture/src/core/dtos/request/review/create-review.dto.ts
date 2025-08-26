import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 4 })
  @IsNotEmpty()
  @IsNumber()
  @Max(5)
  @Min(1)
  rating: number;

  @ApiProperty({ example: 'Great service and facility!' })
  @IsNotEmpty()
  @IsString()
  review: string;

  @ApiProperty({ example: 'uuid of admin' })
  @IsOptional()
  @IsString()
  adminId?: string;

  @ApiProperty({ example: 'uuid of user' })
  @IsOptional()
  @IsString()
  userId?: string;
}
