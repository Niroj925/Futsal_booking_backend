import { Module } from '@nestjs/common';
import { ClsServiceModule } from 'src/services/cls-store/cls-store.module';
import { DataServicesModule } from 'src/services/data-services/data-service.module';
import { ReviewUseCaseService } from './review-use-case.service';
import { ReviewFactoryUseCaseService } from './review-factory-use-case.service';

@Module({
    imports: [DataServicesModule, ClsServiceModule],
    providers: [ReviewUseCaseService, ReviewFactoryUseCaseService],
    exports: [ReviewUseCaseService, ReviewFactoryUseCaseService],
})
export class ReviewUseCaseModule { }
