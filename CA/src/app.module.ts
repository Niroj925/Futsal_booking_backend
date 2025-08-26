import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import routes from './application/controllers/routes';
import { ControllerModule } from './application/controllers/controller.module';
import { AuthGuard } from './application/guards/auth.guard';
import { ClsGuard } from 'nestjs-cls';
import { ClsServiceModule } from './services/cls-store/cls-store.module';
import { JwtServiceModule } from './services/jwt/jwt.module';

@Module({
  imports: [
    ClsServiceModule,
    JwtServiceModule,
    RouterModule.register(routes),
    ControllerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ClsGuard,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: HttpLoggingInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: GoogleOAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: UserGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: CustomThrottlerGuard,
    // },
  ],
})
export class AppModule {}
