import { Module } from '@nestjs/common';
import { UserControllerModule } from './user/user-controller.module';
import { AuthControllerModule } from './auth/auth-controller.module';
import { AdminControllerModule } from './admin/admin-controller.module';
import { FutsalControllerModule } from './futsal/futsal-controller.module';
import { FutsalCourtPriceUseCaseModule } from 'src/use-cases/price/price-use-case.module';
import { TimeSlotControllerModule } from './time-slot/time-slot-controller.module';
import { BookingControllerModule } from './booking/booking-controller.module';
import { ReviewControllerModule } from './review/review-controller.module';

@Module({
  imports: [
    UserControllerModule,
    AuthControllerModule,
    AdminControllerModule,
    FutsalControllerModule,
    FutsalCourtPriceUseCaseModule,
    TimeSlotControllerModule,
    BookingControllerModule,
    ReviewControllerModule
  ],
  exports: [
    UserControllerModule,
    AuthControllerModule,
    AdminControllerModule,
    FutsalControllerModule,
    FutsalCourtPriceUseCaseModule,
    TimeSlotControllerModule,
    BookingControllerModule,
    ReviewControllerModule
  ],
}) 
export class ControllerModule {}
