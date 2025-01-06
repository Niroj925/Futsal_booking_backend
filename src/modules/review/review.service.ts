import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { reviewEntity } from 'src/entites/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(reviewEntity)
    private readonly reviewRepository:Repository<reviewEntity>
  ){}
  async create(userId:string,id:string,createReviewDto: CreateReviewDto) {
     const review=this.reviewRepository.create({
      ...createReviewDto,
      user:{id:userId},
      admin:{id}
     });
     await this.reviewRepository.save(review);
     return true;
  }

 async findAll(id:string) {
const review=await this.reviewRepository.find({
  where:{admin:{id}},
  relations:['user'],
  select:{
    id:true,
    review:true,
    rating:true,
    createdAt:true,
    user:{
      id:true,
      name:true,
      photo:true
    }
  }
})
    return review;
  }

 async findOne(id: string) {
    const review=await this.reviewRepository.find({
      where:{id},
      relations:['user'],
      select:{
        id:true,
        review:true,
        rating:true,
        createdAt:true,
        user:{
          id:true,
          name:true,
          photo:true
        }
      }
    })
        return review;
  }

 async update(userId:string,id: string, updateReviewDto: UpdateReviewDto) {
  const admin = await this.reviewRepository.findOne({ where: {user:{id:userId},admin:{id} } });
  const updatedAdmin = Object.assign(admin, updateReviewDto);
   this.reviewRepository.save(updatedAdmin);
   return true;
  }

 async remove(id: string) {
  await this.reviewRepository.delete({id});
    return true;
  }
}
