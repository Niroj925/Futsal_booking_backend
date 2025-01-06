import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bookingEntity } from 'src/entites/booking.entity';
import { userEntity } from 'src/entites/user.entity';
import { paymentEntity } from 'src/entites/payment.entity';
import { UploadService } from 'src/utils/file.utils';


@Module({
  imports:[TypeOrmModule.forFeature([bookingEntity, userEntity,paymentEntity])],
  controllers: [BookingController],
  providers: [BookingService,UploadService],
})
export class BookingModule {}
