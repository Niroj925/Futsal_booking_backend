import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { adminEntity } from 'src/entity/admin.entity';
import { UploadService } from 'src/utils/file.utils';

@Module({
  imports:[TypeOrmModule.forFeature([adminEntity])],
  controllers: [AdminController],
  providers: [AdminService,UploadService],
})
export class AdminModule {}
