import { BaseModel } from './base/base.model';
import { FutsalCourtModel } from './futsalCourt.model';
import { PaymentModel } from './payment.model';

export class PriceModel extends BaseModel {
  name?: string;
  price: number;
  durationMinute: number;
  court?: FutsalCourtModel;
  payment?: PaymentModel;
}
