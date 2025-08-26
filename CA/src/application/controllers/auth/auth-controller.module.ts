import { Module } from "@nestjs/common";
import { UserUseCaseModule } from "src/use-cases/user/user-use-case.module";
import { AuthController } from "./auth.controller";
import { AuthUseCaseServiceModule } from "src/use-cases/auth/auth-use-case.module";
import { AdminUseCaseModule } from "src/use-cases/admin/admin-use-case.module";

@Module({
    imports:[ UserUseCaseModule,AuthUseCaseServiceModule,AdminUseCaseModule],
    controllers:[AuthController]
})
export class AuthControllerModule{}