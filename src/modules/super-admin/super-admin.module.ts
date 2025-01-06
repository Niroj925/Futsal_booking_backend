import { Module } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminController } from './super-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authEntity } from 'src/entites/auth.entity';
import { hash } from 'src/common/helpers/hash.helper';


@Module({
  imports:[TypeOrmModule.forFeature([authEntity])],
  controllers: [SuperAdminController],
  providers: [SuperAdminService,hash],
})
export class SuperAdminModule {}
