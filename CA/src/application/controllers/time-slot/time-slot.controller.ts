import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { AvailabilityStatus } from 'src/common/enums';
import { CreateTimeSlotDto } from 'src/core/dtos/request/time-slot/create-time-slot.dto';
import { UpdateTimeSlotDto } from 'src/core/dtos/request/time-slot/update-time-slot.dto';
import { TimeSlotUseCaseService } from 'src/use-cases/time-slot/time-slot-use-case.service';

@Controller()
export class TimeSlotController {
  constructor(private TimeSlotUseCaseService: TimeSlotUseCaseService) { }

  @Post('create')
  async createFutsalTimeSlot(@Body() dto: CreateTimeSlotDto) {
    return CoreApiResponse.success(
      await this.TimeSlotUseCaseService.createTimeSlot(dto),
      200,
      'futsal time slot created successfully',
    );
  }

  @Get('futsal-time-slot')
  @ApiQuery({ name: 'status', required: false, enum: AvailabilityStatus })
  async getAllFutsalTimeSlot(@Query() query: Record<string, any>) {
    const { page, limit, ...filters } = query;

    return CoreApiResponse.pagination(
      await this.TimeSlotUseCaseService.getAllFutsalTimeSlot(filters),
      { page, limit },
      200,
      'All futsal time slots fetched successfully',
    );
  }
  @Get('/:slotId')
  async getFutsalTimeSlot(@Param('slotId') id: string) {
    return CoreApiResponse.success(
      await this.TimeSlotUseCaseService.getFutsalTimeSlot(id),
      200,
      'futsal court slot fetched successfully',
    );
  }

  @Patch('status-update/:slotId')
  @ApiQuery({ name: 'status', enum: AvailabilityStatus })
  async updateFutsalTimeSlotStatus(
    @Query('status') status: AvailabilityStatus,
    @Param('slotId') id: string,
  ) {
    return CoreApiResponse.success(
      await this.TimeSlotUseCaseService.updateFutsalTimeSlotStatus(id, status),
      200,
      'futsal court slot status updated successfully',
    );
  }

  @Patch('/:slotId')
  async updateFutsalTimeSlot(
    @Param('slotId') id: string,
    @Body() dto: UpdateTimeSlotDto,
  ) {
    return CoreApiResponse.success(
      await this.TimeSlotUseCaseService.updateFutsalTimeSlot(id, dto),
      200,
      'futsal time slot updated successfully',
    );
  }

  @Delete('/:id')
  async DeleteFutsalTimeSlot(@Param('slotId') id: string) {
    return CoreApiResponse.success(
      await this.TimeSlotUseCaseService.deleteFutsalTimeSlot(id),
      200,
      'futsal time slot deleted successfully',
    );
  }
}
