import { BaseModel } from './base/base.model';
import { AdminModel } from './admin.model';
import { FutsalCourtModel } from './futsalCourt.model';
import { FutsalImageModel } from './futsalImage.model';

export class FutsalModel extends BaseModel {
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  openAt: string;
  closeAt: string;
  admin?: AdminModel;
  court?: FutsalCourtModel[];
  image?: FutsalImageModel[];
}
