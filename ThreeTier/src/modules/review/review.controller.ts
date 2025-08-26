import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { roleType } from 'src/common/constants';
import { AtGuard } from 'src/common/guards/at.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';


@Controller('review')
@ApiTags('Review') 
@ApiResponse({ status: 201, description: 'Created Successfully' })
@ApiResponse({ status: 401, description: 'Unathorised request' })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':id')
  @Roles(roleType.user)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'create a review' })
  create(@Req() req:any,@Param('id') id:string,  @Body() createReviewDto: CreateReviewDto) {
    const userId=req.user.sub;
    return this.reviewService.create(userId,id,createReviewDto);
  }

  @Get('all/:id')
  findAll(@Param('id') id:string) {
    return this.reviewService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @Roles(roleType.user)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'create a review' })
  @ApiBody({type:CreateReviewDto})
  update(@Param('id') id: string,@Req() req:any, @Body() updateReviewDto: UpdateReviewDto) {
    const userId=req.user.sub;
    return this.reviewService.update(userId,id, updateReviewDto);
  }

  @Delete(':id')
  @Roles(roleType.user||roleType.admin)
  @UseGuards(AtGuard, RolesGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'create a review' })
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
