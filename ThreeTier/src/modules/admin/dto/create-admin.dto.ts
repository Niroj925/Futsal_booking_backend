import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsPhoneNumber } from "src/common/decorators/validateContact.decorator";

export class CreateAdminDto {
    @IsString()
    @ApiProperty()
    name:string;

    @IsPhoneNumber({message:'Invalid phone number'})
    @ApiProperty()
    phone:number
}
