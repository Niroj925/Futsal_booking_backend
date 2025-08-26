import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentMethod } from 'src/common/enums';

export class CreatePaymentDto {

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

  @ApiProperty({ example: 'Paid via bank transfer', required: false })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsString()
  bookingId: string;
}
