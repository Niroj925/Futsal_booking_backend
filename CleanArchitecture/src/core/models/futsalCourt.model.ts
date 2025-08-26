import { BaseModel } from './base/base.model';
import { FutsalModel } from './futsal.model';
import { BookingModel } from './booking.model';
import { PriceModel } from './price.model';
import { FutsalImageModel } from './futsalImage.model';
import { AvailabilityStatus } from 'src/common/enums';

export class FutsalCourtModel extends BaseModel {
  name: string;
  dimension: string;
  surfaceType: string;
  availability: AvailabilityStatus;
  futsal?: FutsalModel;
  booking?: BookingModel[];
  price?: PriceModel[];
  image?: FutsalImageModel[];
}
