import { BaseModel } from './base/base.model';
import { AuthModel } from './auth.model';
import { FutsalModel } from './futsal.model';
import { ReviewModel } from './review.model';

export class AdminModel extends BaseModel {
  name: string;
  phone?: string;
  contact?: string;
  status?: boolean;
  photo?: string;
  auth?: AuthModel;
  futsal?: FutsalModel;
  review?: ReviewModel[];
}
