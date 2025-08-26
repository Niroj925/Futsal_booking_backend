import { BaseModel } from './base/base.model';
import { AuthModel } from './auth.model';
import { BookingModel } from './booking.model';
import { ReviewModel } from './review.model';

export class UserModel extends BaseModel {
  name: string;
  address: string;
  contact?: string;
  photo?: string;
  status?: boolean;
  auth?: AuthModel;
  booking?: BookingModel[];
  review?: ReviewModel;
}
