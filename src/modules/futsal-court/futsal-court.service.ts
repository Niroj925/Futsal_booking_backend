import { Injectable } from '@nestjs/common';
import { CreateFutsalCourtDto } from './dto/create-futsal-court.dto';
import { UpdateFutsalCourtDto } from './dto/update-futsal-court.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PriceSchemDto } from './dto/create-priceSchem.dto';
import { futsalCourtEntity } from 'src/entites/futsalCourt.entity';
import { futsalImageEntity } from 'src/entites/futsalImage.entity';
import { priceEntity } from 'src/entites/priceSchema.entity';
import { availabilityStatus } from 'src/common/constants/index.constant';

@Injectable()
export class FutsalCourtService {
  constructor(
    @InjectRepository(futsalCourtEntity)
    private readonly futsalCourtRepository: Repository<futsalCourtEntity>,

    @InjectRepository(futsalImageEntity)
    private readonly futsalCourtImageRepository: Repository<futsalImageEntity>,

    @InjectRepository(priceEntity)
    private readonly priceRepository: Repository<priceEntity>,
  ) {}
  async create(id: string, createFutsalCourtDto: CreateFutsalCourtDto) {
    const futsalCourt = this.futsalCourtRepository.create({
      ...createFutsalCourtDto,
      availability: availabilityStatus.available,
      futsal: { admin:{id} },
    });
    await this.futsalCourtRepository.save(futsalCourt);
    return true;
  }

  async createPrice(id: string, priceSchemDto: PriceSchemDto) {
    const price = this.priceRepository.create({
      ...priceSchemDto,
      court: { id },
    });
    await this.priceRepository.save(price);
    return true;
  }

  async uploadPhoto(id: string, image: string) {
    const futsalImage = this.futsalCourtImageRepository.create({
      image,
      court: { id },
    });
    await this.futsalCourtImageRepository.save(futsalImage);
    return true;
  }

  async findAll(id: string) {
    const futsalCourt = await this.futsalCourtRepository.find({
      where: { futsal: { id } },
    });
    return futsalCourt;
  }

  async findOne(id: string) {
    return await this.futsalCourtRepository.findOne({
      where: { id },
      relations: ['price'],
      select:{
        id:true,
        dimension:true,
        surfaceType:true,
        availability:true,
        price:{
          id:true,
          name:true,
          price:true,
          durationMinute:true
        }
      }
    });
  }

  async update(id: string, updateFutsalCourtDto: UpdateFutsalCourtDto) {
    const admin = await this.futsalCourtRepository.findOne({
      where: { id },
    });
    const updatedAdmin = Object.assign(admin, updateFutsalCourtDto);
    this.futsalCourtRepository.save(updatedAdmin);
    return true;
  }

  async remove(id: string) {
    await this.futsalCourtRepository.delete({ id });
    return true;
  }
}
