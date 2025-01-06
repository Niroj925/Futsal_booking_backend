import { Module } from '@nestjs/common';
import { FutsalService } from './futsal.service';
import { FutsalController } from './futsal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { futsalEntity } from 'src/entites/futsal.entity';
import { futsalImageEntity } from 'src/entites/futsalImage.entity';
import { UploadService } from 'src/utils/file.utils';


@Module({
  imports:[TypeOrmModule.forFeature([futsalEntity,futsalImageEntity])],
  controllers: [FutsalController],
  providers: [FutsalService,UploadService],
})
export class FutsalModule {}
