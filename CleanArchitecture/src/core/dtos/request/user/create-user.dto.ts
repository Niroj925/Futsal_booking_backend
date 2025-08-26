import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  Matches,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({example:'user@gmail.com'})
  email: string;

  @IsString()
  @ApiProperty({example:'password'})
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '123 Main Street' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: '9800898008', required: false })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiProperty({ example: 'http://example.com/photo.jpg', required: false })
  @IsOptional()
  @IsString()
  photo?: string;
}

export class UserIdsDto {
  @IsArray()
  @IsUUID('4', { each: true })
  @ApiProperty({
    example: ['550e8400-e29b-41d4-a716-446655440000', '123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
    description: 'Array of user UUIDs',
  })
  userIds: string[];
}