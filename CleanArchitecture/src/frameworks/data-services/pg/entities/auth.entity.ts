import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { baseEntity } from "./base/base.entity";
import { superAdminEntity } from "./superAdmin.entity";
import { adminEntity } from "./admin.entity";
import { userEntity } from "./user.entity";
import { RoleType } from "src/common/enums";

@Entity('auth')
export class authEntity extends baseEntity {
    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column({nullable:true})
    role:RoleType;

    @Column({default:null})
    rToken: string;

    @OneToOne(()=>superAdminEntity,(superAdmin)=>superAdmin.auth)
    superAdmin:superAdminEntity;

    @OneToOne(()=>adminEntity,(user)=>user.auth,{cascade:true, onDelete:'CASCADE'})
    admin:adminEntity;

    @OneToOne(()=>userEntity,(user)=>user.auth,{cascade:true,onDelete:'CASCADE'})
    user:userEntity;

}