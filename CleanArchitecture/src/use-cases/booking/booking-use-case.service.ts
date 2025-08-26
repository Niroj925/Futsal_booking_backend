import { Injectable } from '@nestjs/common';
import { AdminClsData, AppClsStore, UserClsData } from 'src/common/interface/app-cls-store.interface';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import { BookingFactoryUseCaseService } from './booking-factory-use-case.service';
import { PaymentFactoryUseCaseService } from '../payment/payment-factory-use-case.service';
import { CreateBookingDto } from 'src/core/dtos/request/booking/create-booking.dto';
import { BookingStatus, PaymentStatus } from 'src/common/enums';
import { IPaginationData } from 'src/common/interface/response/response-data.interface';
import { UpdateBookingDto } from 'src/core/dtos/request/booking/update-booking.dto';
import AppException from 'src/application/exception/app.exception';
import { CreateMakePaymentDto, UpdatePaymentDto } from 'src/core/dtos/request/payment/update-payment.dto';
import { formatTimeSlot, getStatus } from 'src/utils/formateTime';

@Injectable()
export class BookingUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private cls: IClsStore<AppClsStore>,
    private bookingFactoryUseCaseService: BookingFactoryUseCaseService,
    private paymentFactoryUseCaseService: PaymentFactoryUseCaseService,
  ) { }

  async createBooking(dto: CreateBookingDto) {
    const alreadyBooked = await this.dataServices.booking.getOneOrNull({
      bookingDate: dto.bookingDate,
      timeSlot: { id: dto.timeSlotId },
      court: { id: dto.courtId },
      status: BookingStatus.APPROVED,
    });
    if (alreadyBooked) throw new AppException('Booking already exists');

    const userCls = this.cls.get<UserClsData>('user');
    if (!userCls) {
      throw new AppException('user not loggedIn');
    }

    return await this.dataServices.transaction(async (manager) => {
      const BookingModel = this.bookingFactoryUseCaseService.createBooking({
        bookingDate: dto.bookingDate,
        userId: userCls.userId,
        courtId: dto.courtId,
        timeSlotId: dto.timeSlotId,
      });
      const newBooking = await this.dataServices.booking.create(
        BookingModel,
        manager,
      );
      const price = await this.dataServices.price.getOne({ id: dto.priceId });
      const paymentModel = this.paymentFactoryUseCaseService.createPayment({
        amount: price?.price,
        bookingId: newBooking.id,
      });
      await this.dataServices.payment.create(paymentModel, manager);
    });
  }

  async updatePaymentStatus(dto:UpdatePaymentDto) {
    const payment = await this.dataServices.payment.getOne({
      booking: { id: dto.bookingId },
    });

    return await this.dataServices.transaction(async (manager) => {

      const paymentModel = this.paymentFactoryUseCaseService.updatePayment(dto);
      await this.dataServices.payment.update({ id: payment.id }, paymentModel, manager);

      const bookingModel = this.bookingFactoryUseCaseService.updateBooking({
        status: getStatus(dto?.status ?? PaymentStatus.PENDING),
      });
      await this.dataServices.booking.update({ id: dto.bookingId }, bookingModel, manager);
    });
  }


  async getAllBookingSlot(
    filters: Record<string, any> = {},
  ): Promise<IPaginationData> {
    const adminCls = this.cls.get<AdminClsData>('admin');
    if (!adminCls) {
      throw new AppException('admin not loggedIn');
    }

    const queryFilter: any = {
      court: { futsal: { admin: { id: adminCls?.adminId } } },
    };
    if (filters?.status !== undefined) {
      queryFilter.status = filters.status;
    }

    const booking = await this.dataServices.booking.getAll(queryFilter, { user: true, payment: true, court: true, timeSlot: true });

    const parsedData = booking.data.map(item => ({
      id: item.id,
      bookingDate: item.bookingDate,
      status: item.status,
      court: item.court.name,
      time: formatTimeSlot(item.timeSlot),
      user: item.user.name,
      payment: item.payment.amount,
      paymentStatus: item.payment.status,
    }));
    return {
      ...booking,
      data: parsedData,
    }
  }


  async getBooking(id: string) {
    return await this.dataServices.booking.getOne({ id },{ user: true, payment: true, court: true, timeSlot: true });
  }

  async updateBooking(id: string, dto: UpdateBookingDto) {
    const bookingModel =
      this.bookingFactoryUseCaseService.updateBooking(dto);
    return await this.dataServices.booking.update({ id }, bookingModel);
  }

  async updateBookingStatus(id: string, status: BookingStatus) {
    const bookingModel = this.bookingFactoryUseCaseService.updateBooking({
      status,
    });
    return await this.dataServices.booking.update({ id }, bookingModel);
  }

  async updateBookingPaymentStatus(dto: UpdatePaymentDto) {
    const paymentModel = this.paymentFactoryUseCaseService.updatePayment(dto);
    return await this.dataServices.payment.update({ booking: { id: dto.bookingId } }, paymentModel);
  }

  async deleteBooking(id: string) {
    return await this.dataServices.timeSlot.delete({ id });
  }

  async makeBookingPayment(dto: CreateMakePaymentDto, paymentProof: string) {

    const userCls = this.cls.get<UserClsData>('user');
    if (!userCls) {
      throw new AppException('user not loggedIn');
    }
    const paymentModel = this.paymentFactoryUseCaseService.updatePayment({
      ...dto,
      proof: paymentProof,
    })
    return await this.dataServices.payment.update({ booking: { id: dto.bookingId } }, paymentModel);
  }

}
