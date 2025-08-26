export interface IJwtServicePayload {
  sub: string;
}

export interface IRefreshTokenPayload {
  sub: string;
  tokenVersion?: number; // Optional but helps invalidate tokens if needed
}

export interface IForgotPasswordPayload {
  sub: string;
  isPasswordResetToken: boolean;
}
export abstract class IJwtService {
  abstract checkToken<T>(token: string): Promise<T>;
  abstract createToken(payload: IJwtServicePayload): Promise<string>;
  abstract createRefreshToken(payload: IRefreshTokenPayload): Promise<string>;
  abstract createResetPasswordToken(
    payload: IJwtServicePayload,
  ): Promise<string>;
}
