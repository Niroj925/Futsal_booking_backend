import { Module } from '@nestjs/common';
import { ClsServiceModule } from 'src/services/cls-store/cls-store.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { FutsalFactoryUseCaseService } from './futsal-factory-use-case.service';
import { FutsalUseCaseService } from './futsal-use-case.service';
import { FutsalImageFactoryUseCaseService } from './futsal-image/futsal-image-factory-use-case.service';
import { FutsalImageUseCaseService } from './futsal-image/futsal-image-use-case.service';
import { FutsalCourtFactoryUseCaseService } from './futsal-court/futsal-court-factory-use-case.service';
import { FutsalCourtUseCaseService } from './futsal-court/futsal-court-use-case.service';

@Module({
  imports: [DataServicesModule, ClsServiceModule],
  providers: [
    FutsalFactoryUseCaseService,
    FutsalUseCaseService,
    FutsalImageFactoryUseCaseService,
    FutsalImageUseCaseService,
    FutsalCourtFactoryUseCaseService,
    FutsalCourtUseCaseService,
  ],
  exports: [
    FutsalUseCaseService,
    FutsalFactoryUseCaseService,
    FutsalImageFactoryUseCaseService,
    FutsalImageUseCaseService,
    FutsalCourtFactoryUseCaseService,
    FutsalCourtUseCaseService,
  ],
})
export class FutsalUseCaseModule {}
