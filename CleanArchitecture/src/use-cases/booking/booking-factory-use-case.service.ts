import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from 'src/core/dtos/request/booking/create-booking.dto';
import { UpdateBookingDto } from 'src/core/dtos/request/booking/update-booking.dto';
import { BookingModel } from 'src/core/models/booking.model';
import { FutsalCourtModel } from 'src/core/models/futsalCourt.model';
import { TimeSlotModel } from 'src/core/models/timeSlot.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class BookingFactoryUseCaseService {
  createBooking(dto: CreateBookingDto) {
    const bookingModel = new BookingModel();
    if (dto.bookingDate) bookingModel.bookingDate = dto.bookingDate;
    if (dto.courtId) {
      const courtModel = new FutsalCourtModel();
      courtModel.id = dto.courtId;
      bookingModel.court = courtModel;
    }
    if (dto.timeSlotId) {
      const timeSlotModel = new TimeSlotModel();
      timeSlotModel.id = dto.timeSlotId;
      bookingModel.timeSlot = timeSlotModel;
    }
    if (dto.userId) {
      const userModel = new UserModel();
      userModel.id = dto.userId;
      bookingModel.user = userModel;
    }
    return bookingModel;
  }

  updateBooking(dto: UpdateBookingDto) {
    const bookingModel = new BookingModel();
    if (dto.bookingDate) bookingModel.bookingDate = dto.bookingDate;
    if (dto.status) bookingModel.status = dto.status;
    if (dto.courtId) {
      const courtModel = new FutsalCourtModel();
      courtModel.id = dto.courtId;
      bookingModel.court = courtModel;
    }
    if (dto.userId) {
      const userModel = new UserModel();
      userModel.id = dto.userId;
      bookingModel.user = userModel;
    }
    return bookingModel;
  }
}
