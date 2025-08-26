import { PaymentMethod, PaymentStatus } from 'src/common/enums';
import { BaseModel } from './base/base.model';
import { PriceModel } from './price.model';
import { BookingModel } from './booking.model';

export class PaymentModel extends BaseModel {
  status?: PaymentStatus;
  method?: PaymentMethod;
  proof?: string | null;
  comment?: string;
  amount?: number;
  booking?: BookingModel;
}
