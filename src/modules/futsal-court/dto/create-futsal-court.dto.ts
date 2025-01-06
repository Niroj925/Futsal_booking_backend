import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateFutsalCourtDto {

    @IsString()
    @ApiProperty()
    name:string;

    @IsString()
    @ApiProperty()
    dimension:string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    surfaceType?:string
}
