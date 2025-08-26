import { BaseModel } from './base/base.model';
import { PaymentModel } from './payment.model';
import { UserModel } from './user.model';
import { FutsalCourtModel } from './futsalCourt.model';
import { TimeSlotModel } from './timeSlot.model';

export class BookingModel extends BaseModel {
  bookingDate: Date;
  status: string;
  court?: FutsalCourtModel;
  timeSlot?: TimeSlotModel;
  payment?: PaymentModel;
  user?: UserModel;
}
