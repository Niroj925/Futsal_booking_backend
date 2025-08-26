import { Module } from "@nestjs/common";
import { ReviewUseCaseModule } from "src/use-cases/review/review-use-case.module";
import { ReviewController } from "./review.controller";

@Module({
    imports:[ReviewUseCaseModule],
    controllers:[ReviewController]
})
export class ReviewControllerModule {}