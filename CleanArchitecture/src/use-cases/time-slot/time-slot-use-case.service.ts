import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import {
  AdminClsData,
  AppClsStore,
} from 'src/common/interface/app-cls-store.interface';
import { TimeSlotFactoryUseCaseService } from './time-factory-use-case.service';
import { CreateTimeSlotDto } from 'src/core/dtos/request/time-slot/create-time-slot.dto';
import { error } from 'console';
import { UpdateTimeSlotDto } from 'src/core/dtos/request/time-slot/update-time-slot.dto';
import { AvailabilityStatus } from 'src/common/enums';
import { IPaginationData } from 'src/common/interface/response/response-data.interface';
import AppException from 'src/application/exception/app.exception';

@Injectable()
export class TimeSlotUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private timeSlotFactoryUseCaseService: TimeSlotFactoryUseCaseService,
    private cls: IClsStore<AppClsStore>,
  ) { }



  async createTimeSlot(dto: CreateTimeSlotDto) {
    const adminCls = this.cls.get<AdminClsData>('admin');
    if (!adminCls) {
      throw new Error('admin not loggedIn');
    }

    const futsal = await this.dataServices.futsal.getOne({
      admin: { id: adminCls?.adminId },
    });
    const newStart = dto.startHr * 60 + dto.startMin;
    const newEnd = dto.endHr * 60 + dto.endMin;
    if (newEnd <= newStart) {
      throw new AppException(
        { message: 'Invalid slot' },
        'Invalid slot: end time must be after start time',
        400,
      );
    }
    if ((newStart + 59) >= newEnd) {
      throw new AppException(
        { message: 'Invalid slot' },
        'Invalid slot: must be at least 1 hour long',
        400,
      );
    }

    const existingSlots = await this.dataServices.timeSlot.getAll({
      futsal: { id: futsal?.id },
    });
    for (const slot of existingSlots.data) {
      const slotStart = slot.startHr * 60 + slot.startMin;
      const slotEnd = slot.endHr * 60 + slot.endMin;

      const overlap = newStart < slotEnd && newEnd > slotStart;
      if (overlap) {
        throw new AppException(
          { message: 'Invalid slot' },
          `Invalid slot: overlaps with existing slot (${slot.startHr}:${slot.startMin} - ${slot.endHr}:${slot.endMin})`,
          400,
        );
      }

      if (newStart >= slotEnd) {
        if (newStart - slotEnd < 9) {
          throw new AppException(
            { message: 'Invalid slot' },
            `Invalid slot: must start at least 10 minutes after previous slot (${slot.startHr}:${slot.startMin} - ${slot.endHr}:${slot.endMin})`,
            400,
          );
        }
      } else if (newEnd <= slotStart) {
        if (slotStart - newEnd < 60) {
          throw new AppException(
            { message: 'Invalid slot' },
            `Invalid slot: must end at least 1 hour before next slot (${slot.startHr}:${slot.startMin} - ${slot.endHr}:${slot.endMin})`,
            400,
          );
        }
      }
    }

    const CourtSlotModel =
      this.timeSlotFactoryUseCaseService.createTimeSlot({
        ...dto,
        futsalId: futsal?.id,
      });

    return await this.dataServices.timeSlot.create(CourtSlotModel);
  }


  async getAllFutsalTimeSlot(
    filters: Record<string, any> = {},
  ): Promise<IPaginationData> {
    const adminCls = this.cls.get<AdminClsData>('admin');
    if (!adminCls) {
      throw new error('admin not loggedIn');
    }

    const queryFilter: any = {
      futsal: { admin: { id: adminCls?.adminId } },
    };
    if (filters?.status !== undefined) {
      queryFilter.status = filters.status;
    }

    return await this.dataServices.timeSlot.getAll(queryFilter);
  }

  async getFutsalTimeSlot(id: string) {
    return await this.dataServices.timeSlot.getOne({ id });
  }

  async updateFutsalTimeSlot(id: string, dto: UpdateTimeSlotDto) {
    const timeSlotModel =
      this.timeSlotFactoryUseCaseService.updateTimeSlot(dto);
    return await this.dataServices.timeSlot.update({ id }, timeSlotModel);
  }

  async updateFutsalTimeSlotStatus(id: string, status: AvailabilityStatus) {
    const timeSlotModel = this.timeSlotFactoryUseCaseService.updateTimeSlot({
      status,
    });
    return await this.dataServices.timeSlot.update({ id }, timeSlotModel);
  }

  async deleteFutsalTimeSlot(id: string) {
    return await this.dataServices.timeSlot.delete({ id });
  }
}
