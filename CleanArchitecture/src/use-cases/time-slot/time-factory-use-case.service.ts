import { Injectable } from '@nestjs/common';
import { CreateTimeSlotDto } from 'src/core/dtos/request/time-slot/create-time-slot.dto';
import { TimeSlotModel } from 'src/core/models/timeSlot.model';
import { FutsalModel } from 'src/core/models/futsal.model';
import { UpdateTimeSlotDto } from 'src/core/dtos/request/time-slot/update-time-slot.dto';

@Injectable()
export class TimeSlotFactoryUseCaseService {
  createTimeSlot(dto: CreateTimeSlotDto) {
    const timeSlotModel = new TimeSlotModel();
    if (dto.startHr) timeSlotModel.startHr = dto.startHr;
    if (dto.startMin) timeSlotModel.startMin = dto.startMin;
    if (dto.endHr) timeSlotModel.endHr = dto.endHr;
    if (dto.endMin) timeSlotModel.endMin = dto.endMin;
    if (dto.futsalId) {
      const futsalModel = new FutsalModel();
      futsalModel.id = dto.futsalId;
      timeSlotModel.futsal = futsalModel;
    }
    return timeSlotModel;
  }

  updateTimeSlot(dto: UpdateTimeSlotDto) {
    const timeSlotModel = new TimeSlotModel();
    if (dto.startHr) timeSlotModel.startHr = dto.startHr;
    if (dto.startMin) timeSlotModel.startMin = dto.startMin;
    if (dto.endHr) timeSlotModel.endHr = dto.endHr;
    if (dto.endMin) timeSlotModel.endMin = dto.endMin;
    if (dto.status) timeSlotModel.status = dto.status;
    return timeSlotModel;
  }
}
