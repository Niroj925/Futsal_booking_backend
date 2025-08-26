import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class PriceSchemDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    name?:string;

    @IsNumber()
    @ApiProperty()
    price:number;

    @IsNumber()
    @ApiProperty()
    durationMinute:number
}