import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/common/helpers/token.helper';
import { hash } from 'src/common/helpers/hash.helper';
import { authEntity } from 'src/entity/auth.entity';
import { AtStrategy } from 'src/common/strategy/at.strategy';
import { RtStrategy } from 'src/common/strategy/rt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([authEntity])],
  controllers: [AuthController],
  providers: [AuthService,Token,hash,AtStrategy,RtStrategy,JwtService],
})
export class AuthModule {}
