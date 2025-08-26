import { PartialType } from '@nestjs/swagger';
import { AuthDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(AuthDto) {}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleType } from 'src/common/enums';

export class UpdateuserAuthDto {
  @ApiProperty({ example: 'user123@gmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'User@123' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: RoleType.USER, enum: RoleType, required: false })
  @IsOptional()
  @IsEnum(RoleType)
  role?: RoleType;

  @ApiProperty({ example: 'some-refresh-token', required: false })
  @IsOptional()
  @IsString()
  rToken?: string | null;

  @ApiProperty({ example: 'superAdminId', required: false })
  @IsOptional()
  @IsString()
  superAdmin?: string;

  @ApiProperty({ example: 'adminId', required: false })
  @IsOptional()
  @IsString()
  admin?: string;

  @ApiProperty({ example: 'userId', required: false })
  @IsOptional()
  @IsString()
  user?: string;
}

