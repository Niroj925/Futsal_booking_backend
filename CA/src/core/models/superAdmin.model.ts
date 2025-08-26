import { BaseModel } from './base/base.model';
import { AuthModel } from './auth.model';

export class SuperAdminModel extends BaseModel {
  name: string;
  photo?: string;
  auth?: AuthModel;
}
