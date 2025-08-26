import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { baseEntity } from "./base/base.entity";
import { authEntity } from "./auth.entity";

@Entity('superAdmin')
export class superAdminEntity extends baseEntity{
    @Column()
    name:string

    @Column({nullable:true})
    photo:string

    @OneToOne(()=>authEntity,(auth)=>auth.superAdmin)
    @JoinColumn({name:'authId'})
    auth:authEntity;
}