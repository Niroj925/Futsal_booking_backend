import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { ClsServiceModule } from 'src/services/cls-store/cls-store.module';
import { BcryptModule } from 'src/services/bcrypt/bcrypt.module';
import { BcryptService } from 'src/services/bcrypt/bcrypt.service';
import { AuthFactoryUseCaseService } from '../auth/auth-factory-use-case.service';
import { AdminFactoryUseCaseService } from './admin-factory-use-case.service';
import { AdminUseCaseService } from './admin-use-case.service';

@Module({
  imports: [
    DataServicesModule,
    ClsServiceModule,
    BcryptModule,
    // NodemailerModule,
  ],
  providers: [
    AdminFactoryUseCaseService,
    AdminUseCaseService,
    BcryptService,
    AuthFactoryUseCaseService
  ],
  exports: [AdminUseCaseService, AdminFactoryUseCaseService],
})
export class AdminUseCaseModule {}
