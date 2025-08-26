import { BaseModel } from './base/base.model';
import { AdminModel } from './admin.model';
import { UserModel } from './user.model';

export class ReviewModel extends BaseModel {
  rating: number;
  review: string;
  admin?: AdminModel;
  user?: UserModel;
}
