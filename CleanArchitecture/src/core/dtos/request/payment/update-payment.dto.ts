import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { PaymentMethod, PaymentStatus } from 'src/common/enums';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @ApiProperty({
        example: PaymentStatus.APPROVED,
        enum: PaymentStatus,
        required: false,
    })
    @IsOptional()
    @IsEnum(PaymentStatus)
    status?: PaymentStatus;
}




export class CreateMakePaymentDto {

    @ApiProperty({
        example: PaymentMethod.CASH,
        enum: PaymentMethod,
        required: false,
    })
    @IsOptional()
    @IsEnum(PaymentMethod)
    method?: PaymentMethod;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Upload an image of payment proof',
        required: true,
    })
    @IsOptional()
    proof?: any;


    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsString()
    bookingId: string;
}
