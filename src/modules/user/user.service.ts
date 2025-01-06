import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { authEntity } from 'src/entites/auth.entity';
import { userEntity } from 'src/entites/user.entity';
import { hash } from 'src/common/helpers/hash.helper';
import { roleType } from 'src/common/constants/index.constant';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(authEntity)
    private readonly authRepository: Repository<authEntity>,

    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,

    private hash: hash,
    private dataSource: DataSource,
  ) {}


  async create(createAuthDto: CreateAuthDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { email, password } = createAuthDto;
      const hashedPassword = await this.hash.value(password);
      const auth = new authEntity();
      auth.email = email;
      (auth.password = hashedPassword), (auth.role = roleType.user);
      await queryRunner.manager.save(auth);

      const admin = new userEntity();
       admin.name="",
       admin.address="",
       admin.auth=auth
      await queryRunner.manager.save(admin);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new ForbiddenException(error.errorResponse);
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

 async findOne(id: string) {
  const user=await this.userRepository.findOne({where:{id}});
    return user;
  }

 async update(id: string, updateUserDto: UpdateUserDto) {
    const admin = await this.userRepository.findOne({
      where: { id },
    });
    const updatedAdmin = Object.assign(admin, updateUserDto);
    this.userRepository.save(updatedAdmin);
    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
