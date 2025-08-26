import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserUseCaseModule } from "src/use-cases/user/user-use-case.module";
import { ClsServiceModule } from "src/services/cls-store/cls-store.module";
import { AuthUseCaseServiceModule } from "src/use-cases/auth/auth-use-case.module";

@Module({
    imports:[ UserUseCaseModule,ClsServiceModule ,AuthUseCaseServiceModule],
    controllers:[UserController]
})
export class UserControllerModule{}