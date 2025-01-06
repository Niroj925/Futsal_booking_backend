import { Injectable } from '@nestjs/common';
import { CreateFutsalDto, CreateLocationDto } from './dto/create-futsal.dto';
import { UpdateFutsalDto } from './dto/update-futsal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { futsalEntity } from 'src/entites/futsal.entity';
import { futsalImageEntity } from 'src/entites/futsalImage.entity';

interface Futsal {
  id: string;  // Update to string if the repository returns id as string
  latitude: number;
  longitude: number;
  location: { latitude: number, longitude: number };
  admin: {
    id: number;
    name: string;
  };
  distance?: number;  // Optional distance field
}


@Injectable()
export class FutsalService {
  constructor(
    @InjectRepository(futsalEntity)
    private readonly futsalRepository: Repository<futsalEntity>,

    @InjectRepository(futsalImageEntity)
    private readonly futsalImageRepository: Repository<futsalImageEntity>,
  ) {}
  async create(id: string, createFutsalDto: CreateFutsalDto) {
    const futsal = this.futsalRepository.create({
      ...createFutsalDto,
      admin: { id },
    });
    await this.futsalRepository.save(futsal);
    return true;
  }

  async uploadPhoto(id: string, image: string) {
    const futsalImage = this.futsalImageRepository.create({
      image,
      futsal: { admin:{id} },
    });
    await this.futsalImageRepository.save(futsalImage);
    return true;
  }

  async findAll() {
    const futsal = await this.futsalRepository.find({
      relations: ['admin'],
      select: {
        id: true,
        location: true,
        latitude:true,
        longitude:true,
        admin: {
          id: true,
          name: true,
        },
      },
    });
    return futsal;
  }

  async findOneInfo(id: string) {
    return await this.futsalRepository.findOne({ where: { admin: { id } } });
  }

  async findOne(id: string) {
    return await this.futsalRepository.findOne({ where: { id } });
  }

  async findImages(id:string){
    const images=this.futsalRepository.findOne({
      where:{admin:{id}},
      relations:['image'],
      select:{
        id:true,
        image:{
          image:true
        }
      }
    })
   return images;
  }
  async update(id: string, updateFutsalDto: UpdateFutsalDto) {
    const admin = await this.futsalRepository.findOne({
      where: { admin: { id } },
    });
    const updatedAdmin = Object.assign(admin, updateFutsalDto);
    this.futsalRepository.save(updatedAdmin);
    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} futsal`;
  }

async findByNear(location: { latitude: number, longitude: number }) {
  console.log(location);

  const futsals = await this.futsalRepository.find({
    relations: ['admin'],
    select: {
      id: true,
      location: true,
      latitude: true,
      longitude: true,
      admin: { id: true, name: true },
    },
  });

  futsals.forEach((futsal: any) => {
    let distance = this.haversine(location.latitude, location.longitude, futsal.latitude, futsal.longitude);
    // Type assertion to add the `distance` property dynamically
    (futsal as any).distance = distance;
  });
  futsals.sort((a: any, b: any) => a.distance - b.distance);
return futsals
}





   haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Radius of the Earth in kilometers
    const R: number = 6371.0;

    // Convert latitude and longitude from degrees to radians
    const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

    const lat1Rad: number = toRadians(lat1);
    const lon1Rad: number = toRadians(lon1);
    const lat2Rad: number = toRadians(lat2);
    const lon2Rad: number = toRadians(lon2);

    // Differences in latitude and longitude
    const dLat: number = lat2Rad - lat1Rad;
    const dLon: number = lon2Rad - lon1Rad;

    // Haversine formula
    const a: number = Math.sin(dLat / 2) ** 2 +
                      Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                      Math.sin(dLon / 2) ** 2;

    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    const distance: number = R * c;

    return distance;
}

}
