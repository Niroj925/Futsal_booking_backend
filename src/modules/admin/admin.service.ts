import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { adminEntity } from 'src/entites/admin.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(adminEntity)
   private readonly adminRepository:Repository<adminEntity>
  ){}

  async uploadPhoto(id:string,photo:string){
    await this.adminRepository.update({id},{photo});
    return true;
  }

  async findAll(paginationDto:PaginationDto) {
    const { page, pageSize } = paginationDto;
    return await this.adminRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize
    })
  }

 async findOne(id: string) {
    return await this.adminRepository.findOne({where:{id}});
  }

 async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.findOne({ where: { id: id } });
    const updatedAdmin = Object.assign(admin, updateAdminDto);
     this.adminRepository.save(updatedAdmin);
     return true;
  }

 async remove(id: string) {
  await this.adminRepository.delete({id});
    return true;
  }
}
