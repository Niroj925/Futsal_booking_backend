import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'src/core/dtos/request/payment/create-payment.dto';
import { UpdatePaymentDto } from 'src/core/dtos/request/payment/update-payment.dto';
import { BookingModel } from 'src/core/models/booking.model';
import { PaymentModel } from 'src/core/models/payment.model';
import { PriceModel } from 'src/core/models/price.model';

@Injectable()
export class PaymentFactoryUseCaseService {
  createPayment(dto: CreatePaymentDto) {
    const paymentModel = new PaymentModel();
    if (dto.method) paymentModel.method = dto.method;
    if (dto.comment) paymentModel.comment = dto.comment;
    if (dto.amount) paymentModel.amount = dto.amount; 
    if (dto.bookingId) {
      const bookingModel = new BookingModel();
      bookingModel.id = dto.bookingId;
      paymentModel.booking = bookingModel;
    }
    return paymentModel;
  }

  updatePayment(dto: UpdatePaymentDto) {
    const paymentModel = new PaymentModel();
    if (dto.status) paymentModel.status = dto.status;
    if (dto.method) paymentModel.method = dto.method;
    if (dto.proof) paymentModel.proof = dto.proof;
    if (dto.comment) paymentModel.comment = dto.comment;
    if (dto.amount) paymentModel.amount = dto.amount; 
    if (dto.bookingId) {
      const bookingModel = new BookingModel();
      bookingModel.id = dto.bookingId;
      paymentModel.booking = bookingModel;
    }
    return paymentModel;
  }
}
