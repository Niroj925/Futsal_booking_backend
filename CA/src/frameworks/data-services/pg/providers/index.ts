import { DataSource } from "typeorm";
import InjectableString from "src/common/injectable.string";
import { userEntity } from "../entities/user.entity";
import { adminEntity } from "../entities/admin.entity";
import { authEntity } from "../entities/auth.entity";
import { bookingEntity } from "../entities/booking.entity";
import { futsalEntity } from "../entities/futsal.entity";
import { futsalCourtEntity } from "../entities/futsalCourt.entity";
import { paymentEntity } from "../entities/payment.entity";
import { priceEntity } from "../entities/price.entity";
import { futsalImageEntity } from "../entities/futsalImage.entity";
import { reviewEntity } from "../entities/review.entity";
import { superAdminEntity } from "../entities/superAdmin.entity";
import { timeSlotEntity } from "../entities/timeSlot.entity";

const providers = [
  // {
  //   provider: DataSource,
  //   userExisting: InjectableString.APP_DATA_SOURCE,
  // },
  {
    provide: superAdminEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(superAdminEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: adminEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(adminEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: authEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(authEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: bookingEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(bookingEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: futsalEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(futsalEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: futsalCourtEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(futsalCourtEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: paymentEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(paymentEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: priceEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(priceEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: futsalImageEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(futsalImageEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: timeSlotEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(timeSlotEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: reviewEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(reviewEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
  {
    provide: userEntity.REPOSITORY,
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(userEntity);
    },
    inject: [InjectableString.APP_DATA_SOURCE],
  },
];

export default providers;
