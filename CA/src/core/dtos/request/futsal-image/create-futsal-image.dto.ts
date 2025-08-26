import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateFutsalImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Upload an image file',
    required: true,
  })
  image: any;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  futsalId?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsString()
  courtId?: string;
}
