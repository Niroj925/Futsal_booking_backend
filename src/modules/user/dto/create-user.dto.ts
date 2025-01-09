import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { IsPhoneNumber } from "src/common/decorators/validateContact.decorator";

export class CreateUserDto {

    @IsOptional()
    @IsString()
    @ApiProperty()
    name?:string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    address?:string;
   
    @IsOptional()
    @IsPhoneNumber()
    @ApiProperty()
    phone?:number
}
