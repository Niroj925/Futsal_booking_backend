import { Module } from '@nestjs/common';
import { FutsalService } from './futsal.service';
import { FutsalController } from './futsal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { futsalEntity } from 'src/entity/futsal.entity';
import { futsalImageEntity } from 'src/entity/futsalImage.entity';
import { UploadService } from 'src/utils/file.utils';


@Module({
  imports:[TypeOrmModule.forFeature([futsalEntity,futsalImageEntity])],
  controllers: [FutsalController],
  providers: [FutsalService,UploadService],
})
export class FutsalModule {}
