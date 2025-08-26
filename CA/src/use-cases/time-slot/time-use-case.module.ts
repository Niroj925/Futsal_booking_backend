import { Module } from '@nestjs/common';
import { ClsServiceModule } from 'src/services/cls-store/cls-store.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { TimeSlotUseCaseService } from './time-slot-use-case.service';
import { TimeSlotFactoryUseCaseService } from './time-factory-use-case.service';

@Module({
  imports: [DataServicesModule, ClsServiceModule],
  providers: [TimeSlotUseCaseService, TimeSlotFactoryUseCaseService],
  exports: [TimeSlotUseCaseService, TimeSlotFactoryUseCaseService],
})
export class TimeSlotUseCaseModule {}
