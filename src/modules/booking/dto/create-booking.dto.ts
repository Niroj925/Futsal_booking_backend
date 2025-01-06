import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateBookingDto {

    @IsDateString()
    @ApiProperty()
    bookingDate:Date;

    @IsDateString()
    @ApiProperty()
    startAt:Date;
}
