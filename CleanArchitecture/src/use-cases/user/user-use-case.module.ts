import { Module } from '@nestjs/common';
import { UserFactoryUseCaseService } from './user-factory-use-case.service';
import { UserUseCaseService } from './user-use-case.service';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { ClsServiceModule } from 'src/services/cls-store/cls-store.module';
import { JwtServiceModule } from 'src/services/jwt/jwt.module';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { BcryptService } from 'src/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/services/jwt/jwt.service';
import { AuthFactoryUseCaseService } from '../auth/auth-factory-use-case.service';

@Module({
  imports: [
    DataServicesModule,
    ClsServiceModule,
    BcryptModule,
    // NodemailerModule,
  ],
  providers: [
    UserFactoryUseCaseService,
    UserUseCaseService,
    BcryptService,
    AuthFactoryUseCaseService
  ],
  exports: [UserUseCaseService, UserFactoryUseCaseService],
})
export class UserUseCaseModule {}
