import { ClsStore } from 'nestjs-cls';
import { JwtPayload } from './jwt-payload.interface';
import { IPaginationQuery } from './response/pagination-options.interface';

export interface AppClsStore extends ClsStore {
  user?: UserClsData;
  admin?: AdminClsData;
  isPublic?: boolean;
  isUser?: boolean;
  payload?: JwtPayload;
  paginationQuery?: IPaginationQuery;
}

export interface UserClsData {
  id?: string;
  userId?: string;
  email?: string;
  contact?: string;
  name?: string;
  roles?: string[];
}

export interface AdminClsData {
  id?: string;
  adminId?: string;
  email?: string;
  contact?: string;
  name?: string;
  roles?: string[];
}
