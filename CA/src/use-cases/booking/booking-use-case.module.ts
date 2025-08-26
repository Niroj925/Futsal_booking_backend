import { Module } from '@nestjs/common';
import { ClsServiceModule } from 'src/services/cls-store/cls-store.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { BookingFactoryUseCaseService } from './booking-factory-use-case.service';
import { BookingUseCaseService } from './booking-use-case.service';
import { PaymentFactoryUseCaseService } from '../payment/payment-factory-use-case.service';
    
@Module({
  imports: [DataServicesModule, ClsServiceModule],
  providers: [BookingFactoryUseCaseService, BookingUseCaseService,PaymentFactoryUseCaseService],
  exports: [BookingFactoryUseCaseService, BookingUseCaseService],
})
export class BookingUseCaseModule {}
