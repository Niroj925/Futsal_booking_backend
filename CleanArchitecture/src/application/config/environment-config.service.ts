import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/core/config/database.interface';
import { JWTConfig } from 'src/core/config/jwt.interface';
import { NodemailerConfig } from 'src/core/config/nodemailer.config';
import { DefaultSuperAdminConfig } from 'src/core/config/superadmin.interface';

@Injectable()
export class EnvironmentConfigService
  implements
    JWTConfig,
    DefaultSuperAdminConfig,
    DatabaseConfig,
    NodemailerConfig
{
  constructor(private configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET')!;
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME')!;
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')!;
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME')!;
  }

  // database---------------------------------------------

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST')!;
  }

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT')!;
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER')!;
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD')!;
  }

  // getDatabaseCa(): string {
  //   return this.configService.get<string>('DATABASE_CA')!;
  // }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA')!;
  }

  // database---------------------------------------------

  // super admin ---------------------------------------
  getDefaultSuperAdminFullName(): string {
    return this.configService.get<string>('SUPER_ADMIN_FULL_NAME')!;
  }

  getDefaultSuperAdminMiddleName(): string {
    return this.configService.get<string>('SUPER_ADMIN_MIDDLE_NAME')!;
  }

  getDefaultSuperAdminLastName(): string {
    return this.configService.get<string>('SUPER_ADMIN_LAST_NAME')!;
  }

  getDefaultSuperAdminEmail(): string {
    return this.configService.get<string>('SUPER_ADMIN_EMAIL')!;
  }

  getDefaultSuperAdminContact(): string {
    return this.configService.get<string>('SUPER_ADMIN_CONTACT')!;
  }

  getDefaultSuperAdminDOB(): string {
    return this.configService.get<string>('SUPER_ADMIN_DOB')!;
  }

  getDefaultSuperAdminPassword(): string {
    return this.configService.get<string>('SUPER_ADMIN_PASSWORD')!;
  }

  getDefaultSuperAdminPrimaryContact(): string {
    return this.configService.get<string>('SUPER_ADMIN_PRIMARY_CONTACT')!;
  }

  getDefaultSuperAdminSecondaryContact(): string {
    return this.configService.get<string>('SUPER_ADMIN_SECONDARY_CONTACT')!;
  }

  // super admin ---------------------------------------

  // database ---------------------------------------------

  getDatabaseName(): string {
    return this.configService.get<string>('DB_NAME')!;
  }

  // database ---------------------------------------------

  // nodemailer ----------------------------------------------

  getEmailHost(): string {
    return this.configService.get<string>('EMAIL_HOST')!;
  }

  getEmailPort(): number {
    return this.configService.get<number>('EMAIL_PORT')!;
  }

  getEmailSecure(): boolean {
    return this.configService.get<boolean>('EMAIL_SECURE')!;
  }

  getEmailUser(): string {
    return this.configService.get<string>('EMAIL_USER')!;
  }

  getEmailPass(): string {
    return this.configService.get<string>('EMAIL_PASS')!;
  }

  getEmailFrom(): string {
    return this.configService.get<string>('EMAIL_FROM')!;
  }
}
