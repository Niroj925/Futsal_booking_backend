import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFutsalDto {
    @IsString()
    @ApiProperty()
    description:string;

    @IsString()
    @ApiProperty()
    location:string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    latitude?:number

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    longitude?:number

    @IsString()
    @ApiProperty()
    openAt:string;

    @IsString()
    @ApiProperty()
    closeAt:string;

}

export class CreateLocationDto{
  
    @IsNumber()
    @ApiProperty()
    latitude:number

    @IsNumber()
    @ApiProperty()
    longitude:number
}
