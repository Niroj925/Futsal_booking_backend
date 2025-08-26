import { Inject, Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { IDataServices } from "src/core/abstracts/data-services.abstract";
import { PgGenericRepository } from "./pg.generic-repository";
import { authEntity } from "./entities/auth.entity";
import { userEntity } from "./entities/user.entity";
import { adminEntity } from "./entities/admin.entity";
import { bookingEntity } from "./entities/booking.entity";
import { futsalEntity } from "./entities/futsal.entity";
import { futsalCourtEntity } from "./entities/futsalCourt.entity";
import { futsalImageEntity } from "./entities/futsalImage.entity";
import { paymentEntity } from "./entities/payment.entity";
import { priceEntity } from "./entities/price.entity";
import { reviewEntity } from "./entities/review.entity";
import { superAdminEntity } from "./entities/superAdmin.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { IClsStore } from "src/core/abstracts/adapters/cls-store.abstract";
import { AppClsStore } from "src/common/interface/app-cls-store.interface";
import InjectableString from "src/common/injectable.string";
import { timeSlotEntity } from "./entities/timeSlot.entity";

@Injectable()
export class PgDataServices implements IDataServices, OnApplicationBootstrap {
  auth: PgGenericRepository<authEntity>;
  user: PgGenericRepository<userEntity>;
  admin: PgGenericRepository<adminEntity>;
  booking: PgGenericRepository<bookingEntity>;
  futsal: PgGenericRepository<futsalEntity>;
  futsalCourt: PgGenericRepository<futsalCourtEntity>;
  futsalImage: PgGenericRepository<futsalImageEntity>;
  timeSlot: PgGenericRepository<timeSlotEntity>;
  payment: PgGenericRepository<paymentEntity>;
  price: PgGenericRepository<priceEntity>;
  review: PgGenericRepository<reviewEntity>;
  superAdmin: PgGenericRepository<superAdminEntity>;

  constructor(
    @Inject(authEntity.REPOSITORY)
    private authRepository: Repository<authEntity>,

    @Inject(userEntity.REPOSITORY)
    private userRepository: Repository<userEntity>,

    @Inject(adminEntity.REPOSITORY)
    private adminRepository: Repository<adminEntity>,

    @Inject(bookingEntity.REPOSITORY)
    private bookingRepository: Repository<bookingEntity>,

    @Inject(futsalEntity.REPOSITORY)
    private futsalRepository: Repository<futsalEntity>,

    @Inject(futsalCourtEntity.REPOSITORY)
    private futsalCourtRepository: Repository<futsalCourtEntity>,

    @Inject(futsalImageEntity.REPOSITORY)
    private futsalImageRepository: Repository<futsalImageEntity>,

    @Inject(timeSlotEntity.REPOSITORY)
    private timeSlotRepository: Repository<timeSlotEntity>,

    @Inject(paymentEntity.REPOSITORY)
    private paymentRepository: Repository<paymentEntity>,

    @Inject(priceEntity.REPOSITORY)
    private priceRepository: Repository<priceEntity>,

    @Inject(reviewEntity.REPOSITORY)
    private reviewRepository: Repository<reviewEntity>,

    @Inject(superAdminEntity.REPOSITORY)
    private superAdminRepository: Repository<superAdminEntity>,

    private readonly cls: IClsStore<AppClsStore>,

    @Inject(InjectableString.APP_DATA_SOURCE)
    private dataSource: DataSource
  ) {}

  onApplicationBootstrap() {
    this.auth = new PgGenericRepository(this.cls, this.authRepository);
    this.user = new PgGenericRepository(this.cls, this.userRepository);
    this.admin = new PgGenericRepository(this.cls, this.adminRepository);
    this.booking = new PgGenericRepository(this.cls, this.bookingRepository);
    this.futsal = new PgGenericRepository(this.cls, this.futsalRepository);
    this.futsalCourt = new PgGenericRepository(this.cls, this.futsalCourtRepository);
    this.futsalImage = new PgGenericRepository(this.cls, this.futsalImageRepository);
    this.timeSlot = new PgGenericRepository(this.cls, this.timeSlotRepository);
    this.payment = new PgGenericRepository(this.cls, this.paymentRepository);
    this.price = new PgGenericRepository(this.cls, this.priceRepository);
    this.review = new PgGenericRepository(this.cls, this.reviewRepository);
    this.superAdmin = new PgGenericRepository(this.cls, this.superAdminRepository);
  }

  /**
   * Execute a function within a database transaction
   * @param operation The function to execute within the transaction
   * @returns The result of the operation
   */
  async transaction<T>(
    operation: (manager: EntityManager) => Promise<T>
  ): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await operation(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
