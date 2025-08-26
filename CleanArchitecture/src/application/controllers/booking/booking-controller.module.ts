import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller";
import { BookingUseCaseModule } from "src/use-cases/booking/booking-use-case.module";
import { DataServicesModule } from "src/services/data-services/data-service.module";
import { FileUploadModule } from "src/services/file-upload/file-upload.module";
import { ClsServiceModule } from "src/services/cls-store/cls-store.module";

@Module({
    imports:[BookingUseCaseModule,DataServicesModule,FileUploadModule,ClsServiceModule],
    controllers:[BookingController]
})
export class BookingControllerModule {}