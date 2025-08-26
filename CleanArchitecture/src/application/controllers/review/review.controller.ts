import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { CoreApiResponse } from 'src/application/api/core-api-response';
import { AvailabilityStatus } from 'src/common/enums';
import { CreateReviewDto } from 'src/core/dtos/request/review/create-review.dto';
import { UpdateReviewDto } from 'src/core/dtos/request/review/update-review.dto';
import { CreateTimeSlotDto } from 'src/core/dtos/request/time-slot/create-time-slot.dto';
import { UpdateTimeSlotDto } from 'src/core/dtos/request/time-slot/update-time-slot.dto';
import { ReviewUseCaseService } from 'src/use-cases/review/review-use-case.service';
import { TimeSlotUseCaseService } from 'src/use-cases/time-slot/time-slot-use-case.service';

@Controller()
export class ReviewController {
    constructor(private reviewUseCaseService: ReviewUseCaseService) { }

    @Post('create')
    async createReview(@Body() dto: CreateReviewDto) {
        return CoreApiResponse.success(
            await this.reviewUseCaseService.createReview(dto),
            200,
            'Review created successfully',
        );
    }

    @Get('reviews')
    async getAllReviews() {
        return CoreApiResponse.pagination(
            await this.reviewUseCaseService.getAllReviews(),
            {},
            200,
            'All reviews fetched successfully',
        );
    }

    @Get('/:reviewId')
    async getFutsalTimeSlot(@Param('reviewId') id: string) {
        return CoreApiResponse.success(
            await this.reviewUseCaseService.getReview(id),
            200,
            'review fetched successfully',
        );
    }

    @Patch('status-update/:reviewId')
    async updateReview(
        @Body() dto: UpdateReviewDto,
        @Param('reviewId') id: string,
    ) {
        return CoreApiResponse.success(
            await this.reviewUseCaseService.updateReview(id, dto),
            200,
            'review updated successfully',
        );
    }


    @Delete('/:id')
    async DeleteReview(@Param('reviewId') id: string) {
        return CoreApiResponse.success(
            await this.reviewUseCaseService.deleteReview(id),
            200,
            'review deleted successfully',
        );
    }
}
