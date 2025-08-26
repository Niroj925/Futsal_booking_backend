import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { authEntity } from 'src/entity/auth.entity';
import { Token } from 'src/common/helpers/token.helper';
import { hash } from 'src/common/helpers/hash.helper';
import { JwtPayload } from 'src/common/types/index.types';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(authEntity)
    private readonly authRepository:Repository<authEntity>,

    private token:Token,
    private hash:hash,
  ){}

  private roleUser={
    admin:'admin',
    superAdmin:'superAdmin',
    user:'user'
  }

  async create(createAuthDto: CreateAuthDto) {
    const {email,password}=createAuthDto;
   const authUser=await this.authRepository.findOne({
    where:{email},
    relations:['admin','superAdmin','user']
  });
   if (!authUser) {
    throw new ForbiddenException("User Not found")
  } else {
    const status = await this.hash.verifyHashing(authUser.password,password)
    if (!status) {
      throw new UnauthorizedException("Credential doesn't match")
    }
    const userRole = this.roleUser[authUser.role]; 
    const roleEntityId = authUser[userRole]?.id
    const tokens = {
      accessToken: await this.token.generateAcessToken({ sub: roleEntityId?roleEntityId:authUser.id, role: authUser.role }),
      refreshToken: await this.token.generateRefreshToken({ sub: roleEntityId?roleEntityId:authUser.id, role: authUser.role }),
      role:authUser.role
    }
    authUser.rToken = await this.hash.value(tokens.refreshToken)
    await this.authRepository.save(authUser)
    return tokens
  }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

 async userInfo(user:JwtPayload){
   const userEntity = this.roleUser[user.role]; 
   const userInfo=await this.authRepository.findOne({
    where:{[userEntity]:{id:user.sub}},
    relations:[userEntity],
    select:{
      id:true
    }
   });
   return userInfo
  }

  async refreshTokenAdmin(user:JwtPayload) {
    // if (user.role === 'client') {
    //   return await this.token.generateAcessToken({ sub: user.sub, role: user.role })
    // } else {
    //   const activeAdmin = this.adminRepository.findOne({ where: { id: user.sub } })
    //   if (activeAdmin) {
    //     return await this.token.generateAcessToken({ sub: user.sub, role: user.role })
    //   }
    // }
    return await this.token.generateAcessToken({ sub: user.sub, role: user.role })
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
