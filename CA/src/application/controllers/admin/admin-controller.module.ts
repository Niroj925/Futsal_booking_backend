import { Module } from '@nestjs/common';
import { AdminUseCaseModule } from 'src/use-cases/admin/admin-use-case.module';
import { AdminController } from './admin.controller';
import { AuthUseCaseServiceModule } from 'src/use-cases/auth/auth-use-case.module';

@Module({
  imports: [AdminUseCaseModule,AuthUseCaseServiceModule],
  controllers: [AdminController],
})
export class AdminControllerModule {}
