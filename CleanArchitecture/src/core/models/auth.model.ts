
import { RoleType } from 'src/common/enums';
import { BaseModel } from './base/base.model';
import { UserModel } from './user.model';
import { AdminModel } from './admin.model';

export class AuthModel extends BaseModel {
  email: string;
  password: string;
  role?:RoleType;
  rToken?:string | null;
  user:UserModel;
  admin:AdminModel;
}
