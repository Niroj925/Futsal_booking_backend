import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interface/jwt-payload.interface';
import {
  IJwtService,
  IRefreshTokenPayload,
} from 'src/core/abstracts/adapters/jwt.interface';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    const decode = await this.jwtService.verifyAsync(token);
    return decode;
  }

  async createToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: '1h' });
  }

  async createRefreshToken(payload: IRefreshTokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: '30d' });
  }

  async createResetPasswordToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, { expiresIn: '7d' });
  }
}
