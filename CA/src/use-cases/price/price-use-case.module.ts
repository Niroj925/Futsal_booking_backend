import { Module } from '@nestjs/common';
import { ClsServiceModule } from 'src/services/cls-store/cls-store.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { FutsalCourtPriceUseCaseService } from './price-use-case.service';
import { PriceFactoryUseCaseService } from './price-factory-use-case.service';

@Module({
  imports: [DataServicesModule, ClsServiceModule],
  providers: [
    FutsalCourtPriceUseCaseService,
    PriceFactoryUseCaseService
  ],
  exports: [
    FutsalCourtPriceUseCaseService,
    PriceFactoryUseCaseService
  ],
})
export class FutsalCourtPriceUseCaseModule {}
