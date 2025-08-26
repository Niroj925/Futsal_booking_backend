import { Module } from '@nestjs/common';
import { FutsalController } from './futsal.controller';
import { FutsalUseCaseModule } from 'src/use-cases/futsal/futsal-use-case.module';
import { FileUploadModule } from 'src/services/file-upload/file-upload.module';
import { FutsalCourtPriceUseCaseModule } from 'src/use-cases/price/price-use-case.module';

@Module({
  imports: [FutsalUseCaseModule,FileUploadModule,FutsalCourtPriceUseCaseModule],
  controllers: [FutsalController],
})
export class FutsalControllerModule {}
