import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { superAdminEntity } from "./superAdmin.entity";
import { adminEntity } from "./admin.entity";
import { userEntity } from "./user.entity";
import { roleType } from "src/common/constants/index.constant";

@Entity('auth')
export class authEntity extends parentEntity {
    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column()
    role:roleType;

    @Column({default:null})
    rToken: string;

    @OneToOne(()=>superAdminEntity,(superAdmin)=>superAdmin.auth)
    superAdmin:superAdminEntity;

    @OneToOne(()=>adminEntity,(user)=>user.auth)
    admin:adminEntity;

    @OneToOne(()=>userEntity,(user)=>user.auth)
    user:userEntity;

}