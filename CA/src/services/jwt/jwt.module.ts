import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/application/config/environment-config.module';
import { EnvironmentConfigService } from 'src/application/config/environment-config.service';
import { JwtModule } from '@nestjs/jwt';
import { IJwtService } from 'src/core/abstracts/adapters/jwt.interface';
import { JwtTokenService } from './jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      global: true,
      useFactory: (configService: EnvironmentConfigService) => ({
        secret: configService.getJwtSecret(),
      }),
    }),
  ],
  providers: [
    {
      provide: IJwtService,
      useClass: JwtTokenService,
    },
  ],
  exports: [IJwtService],
})
export class JwtServiceModule {}
