import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authEntity } from 'src/entity/auth.entity';
import { userEntity } from 'src/entity/user.entity';
import { hash } from 'src/common/helpers/hash.helper';


@Module({
  imports:[TypeOrmModule.forFeature([authEntity,userEntity])],
  controllers: [UserController],
  providers: [UserService,hash],
})
export class UserModule {}
