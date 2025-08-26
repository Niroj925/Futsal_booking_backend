import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Admin Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '9876543210', required: false })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiProperty({ example: 'http://example.com/photo.jpg', required: false })
  @IsOptional()
  @IsString()
  photo?: string;
}

export class AdminIdsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  @ApiProperty({
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '123e4567-e89b-12d3-a456-426614174000',
    ],
    type: [String],
    description: 'Array of admin UUIDs',
  })
  adminIds: string[];
}
