import { Module } from '@nestjs/common';
import { FutsalCourtService } from './futsal-court.service';
import { FutsalCourtController } from './futsal-court.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { futsalCourtEntity } from 'src/entites/futsalCourt.entity';
import { futsalImageEntity } from 'src/entites/futsalImage.entity';
import { priceEntity } from 'src/entites/priceSchema.entity';
import { UploadService } from 'src/utils/file.utils';


@Module({
  imports:[TypeOrmModule.forFeature([futsalCourtEntity,futsalImageEntity,priceEntity])],
  controllers: [FutsalCourtController],
  providers: [FutsalCourtService,UploadService],
})
export class FutsalCourtModule {}
