import { AvailabilityStatus } from 'src/common/enums';
import { BaseModel } from './base/base.model';
import { FutsalModel } from './futsal.model';

export class TimeSlotModel extends BaseModel {
  startHr?: number;
  startMin?: number;
  endHr?: number;
  endMin?: number;
  status?: AvailabilityStatus;
  futsal?: FutsalModel;
}
