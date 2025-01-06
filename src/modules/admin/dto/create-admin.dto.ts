import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateAdminDto {
    @IsString()
    @ApiProperty()
    name:string;

    @IsNumber()
    @ApiProperty()
    phone:number
}
