import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FutsalModule } from './modules/futsal/futsal.module';
import { FutsalCourtModule } from './modules/futsal-court/futsal-court.module';
import { BookingModule } from './modules/booking/booking.module';
import { ReviewModule } from './modules/review/review.module';
import databaseConfig from './config/db.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ErrorLoggerMiddleware } from './common/middlewares/errorLogger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    ThrottlerModule.forRoot([
      {
        limit: 10,//10 request per minutes
        ttl: 60000,
      }
    ]),
    AuthModule,
    SuperAdminModule,
    AdminModule,
    UserModule,
    FutsalModule,
    FutsalCourtModule,
    BookingModule,
    ReviewModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})

// export class AppModule { }
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes('*');
//   }
// }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorLoggerMiddleware).forRoutes('*');
  }                             
}
