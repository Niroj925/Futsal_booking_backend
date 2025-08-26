import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSuperAdminDto {
  @ApiProperty({ example: 'Super Admin Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'https://photo.url/superadmin.jpg', required: false })
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ example: 'uuid of auth' })
  @IsNotEmpty()
  @IsString()
  authId: string;
}
