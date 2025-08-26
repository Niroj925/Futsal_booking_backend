import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { IClsStore } from 'src/core/abstracts/adapters/cls-store.abstract';
import {
    AdminClsData,
  AppClsStore,
  UserClsData,
} from 'src/common/interface/app-cls-store.interface';
import { IPaginationData } from 'src/common/interface/response/response-data.interface';
import AppException from 'src/application/exception/app.exception';
import { ReviewFactoryUseCaseService } from './review-factory-use-case.service';
import { CreateReviewDto } from 'src/core/dtos/request/review/create-review.dto';
import { UpdateReviewDto } from 'src/core/dtos/request/review/update-review.dto';

@Injectable()
export class ReviewUseCaseService {
  constructor(
    private dataServices: IDataServices,
    private reviewFactoryUseCaseService: ReviewFactoryUseCaseService,
    private cls: IClsStore<AppClsStore>,
  ) { }



  async createReview(dto: CreateReviewDto) {
    const userCls = this.cls.get<UserClsData>('user');
    if (!userCls) {
      throw new AppException('user not loggedIn');
    }

    const alreadyExists = await this.dataServices.review.getOneOrNull({
      user:{id:userCls.userId},
      admin: {id:dto.adminId}
    });

    if(alreadyExists) throw new AppException('Review already exists');

    const reviewModel=this.reviewFactoryUseCaseService.createReview({
      ...dto,
      adminId: dto.adminId,
      userId: userCls.userId
    });
    return await this.dataServices.review.create(reviewModel);
  }


  async getAllReviews(
    filters: Record<string, any> = {},
  ): Promise<IPaginationData> {
    const adminCls = this.cls.get<AdminClsData>('admin');
    if (!adminCls) {
      throw new AppException('admin not loggedIn');
    }

    return await this.dataServices.review.getAll({admin:{id:adminCls.adminId}});
  }

  async getReview(id:string){
    return await this.dataServices.review.getOne({id});
  }

  async updateReview(id: string, dto: UpdateReviewDto) {
    const reviewModel =
      this.reviewFactoryUseCaseService.updateReview(dto);
    return await this.dataServices.review.update({ id }, reviewModel);
  }

  async deleteReview(id: string) {
    return await this.dataServices.review.delete({ id });
  }
}
