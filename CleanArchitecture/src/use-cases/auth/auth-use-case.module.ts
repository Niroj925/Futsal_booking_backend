import { Module } from '@nestjs/common';
import { BcryptService } from 'src/services/bcrypt/bcrypt.service';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { AuthFactoryUseCaseService } from './auth-factory-use-case.service';
import { AuthUseCaseService } from './auth-use-case.service';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { JwtServiceModule } from 'src/services/jwt/jwt.module';
import { JwtTokenService } from 'src/services/jwt/jwt.service';
import { ClsServiceModule } from 'src/services/cls-store/cls-store.module';

@Module({
  imports: [
    DataServicesModule,
    ClsServiceModule,
    BcryptModule,
    JwtServiceModule,
  ],
  providers: [
    AuthFactoryUseCaseService,
    AuthUseCaseService,
    BcryptService,
    JwtTokenService,
  ],
  exports: [AuthUseCaseService, AuthFactoryUseCaseService],
})
export class AuthUseCaseServiceModule {}
