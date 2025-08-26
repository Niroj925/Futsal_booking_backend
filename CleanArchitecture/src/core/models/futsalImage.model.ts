import { BaseModel } from './base/base.model';
import { FutsalModel } from './futsal.model';
import { FutsalCourtModel } from './futsalCourt.model';

export class FutsalImageModel extends BaseModel {
  image: string;
  futsal?: FutsalModel;
  court?: FutsalCourtModel;
}
