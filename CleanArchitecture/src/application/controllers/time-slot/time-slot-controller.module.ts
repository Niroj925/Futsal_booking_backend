import { Module } from "@nestjs/common";
import { DataServicesModule } from "src/services/data-services/data-service.module";
import { TimeSlotUseCaseModule } from "src/use-cases/time-slot/time-use-case.module";
import { TimeSlotController } from "./time-slot.controller";

@Module({
    imports:[TimeSlotUseCaseModule,DataServicesModule],
    controllers:[TimeSlotController]
})
export class TimeSlotControllerModule {}