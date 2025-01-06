import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateSuperAdminDto {
    @IsEmail()
    @ApiProperty()
    email:string;

    @IsString()
    @ApiProperty()
    @MinLength(8)
    password:string
}
