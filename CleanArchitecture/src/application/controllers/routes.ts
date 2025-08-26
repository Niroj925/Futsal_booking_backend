import { Routes } from '@nestjs/core';
import { UserControllerModule } from './user/user-controller.module';
import { AuthControllerModule } from './auth/auth-controller.module';
import { AdminControllerModule } from './admin/admin-controller.module';
import { FutsalControllerModule } from './futsal/futsal-controller.module';
import { TimeSlotControllerModule } from './time-slot/time-slot-controller.module';
import { BookingControllerModule } from './booking/booking-controller.module';
import { ReviewControllerModule } from './review/review-controller.module';

const routes: Routes = [
  {
    path: '/',
    children: [
      {
        path: 'auth',
        children: [AuthControllerModule],
      },
      {
        path: 'user',
        children: [UserControllerModule],
      },
      {
        path: 'admin',
        children: [AdminControllerModule],
      },
      {
        path: 'futsal',
        children: [FutsalControllerModule],
      },
      {
        path: 'time-slot',
        children: [TimeSlotControllerModule],
      },
      {
        path: 'booking',
        children: [BookingControllerModule],
      },
      {
        path: 'review',
        children: [ReviewControllerModule],
      },
    ],
  },
];

export default routes;
