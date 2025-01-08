import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { bookingEntity } from 'src/entity/booking.entity';
import { paymentEntity } from 'src/entity/payment.entity';
import { bookingStatus, paymentMethod, paymentStatus } from 'src/common/constants/index.constant';
import { userEntity } from 'src/entity/user.entity';
import { futsalCourtEntity } from 'src/entity/futsalCourt.entity';
import { priceEntity } from 'src/entity/priceSchema.entity';
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(bookingEntity)
    private readonly bookingRepository: Repository<bookingEntity>,

    @InjectRepository(paymentEntity)
    private readonly paymentRepository: Repository<paymentEntity>,

    private readonly dataSource: DataSource,
  ) {}
  async create(userId: string, query:{courtId:string,priceId:string}, createBookingDto: CreateBookingDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const {bookingDate, startAt } = createBookingDto;
      const booking = new bookingEntity();
      booking.bookingDate = bookingDate;
      booking.startAt = startAt;
      booking.endAt = new Date();
      booking.status=bookingStatus.pending;
      booking.user = { id: userId } as userEntity;
      booking.court = { id:query.courtId } as futsalCourtEntity;
      await queryRunner.manager.save(booking);

      const payment = new paymentEntity();
      payment.price = {id:query.priceId} as priceEntity;
      payment.status = null;
      payment.proof = null;
      payment.booking = booking;
      await queryRunner.manager.save(payment);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new ForbiddenException(error.errorResponse);
    } finally {
      await queryRunner.release();
    }
  }

  async findByStatus(id: string, status: bookingStatus) {
    const booking = await this.bookingRepository.find({
      where: { status, court: { futsal: { admin: { id } } } },
    });
    return booking;
  }

  async uploadProof(id:string,method:paymentMethod,proof:string){
   await this.paymentRepository.update({booking:{id}},{proof,method:method,status:paymentStatus.pending});
   return true;
  }

  async bookingInfo(id: string) {
    const bookingInfo = await this.bookingRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return bookingInfo;
  }

  findAll() {
    return `This action returns all booking`;
  }

  async updateStatus(id: string, status: bookingStatus) {
    await this.bookingRepository.update({ id }, { status });
    return true;
  }

 async update(id: string, status:paymentStatus) {
  await this.paymentRepository.update({booking:{id}},{status});
    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
