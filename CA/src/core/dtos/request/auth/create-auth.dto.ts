import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleType } from 'src/common/enums';

export class AuthDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreatAuthDto {
  @ApiProperty({ example: 'userId123' })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ example: 'adminId123' })
  @IsOptional()
  @IsString()
  adminId?: string;

  @ApiProperty({ example: 'email@gmailc.om' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: RoleType.USER })
  @IsNotEmpty()
  @IsEnum({ enum: RoleType })
  role: RoleType;
}
