import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from 'src/core/dtos/request/review/create-review.dto';
import { UpdateReviewDto } from 'src/core/dtos/request/review/update-review.dto';
import { AdminModel } from 'src/core/models/admin.model';
import { ReviewModel } from 'src/core/models/review.model';
import { UserModel } from 'src/core/models/user.model';

@Injectable()
export class ReviewFactoryUseCaseService {
  createReview(dto: CreateReviewDto) {
    const reviewModel = new ReviewModel();
    if (dto.rating) reviewModel.rating = dto.rating;
    if (dto.review) reviewModel.review = dto.review;
    if (dto.adminId) {
      const adminModel = new AdminModel();
      adminModel.id = dto.adminId;
      reviewModel.admin = adminModel;
    }
    if (dto.userId) {
      const userModel = new UserModel();
      userModel.id = dto.userId;
      reviewModel.user = userModel;
    }
    return reviewModel;
  }

  updateReview(dto: UpdateReviewDto) {
    const reviewModel = new ReviewModel();
    if (dto.rating) reviewModel.rating = dto.rating;
    if (dto.review) reviewModel.review = dto.review;
    if (dto.adminId) {
      const adminModel = new AdminModel();
      adminModel.id = dto.adminId;
    }
    if (dto.userId) {
      const userModel = new UserModel();
      userModel.id = dto.userId;
      reviewModel.user = userModel;
    }
    return reviewModel;
  }
}
