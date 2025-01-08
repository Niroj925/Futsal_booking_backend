import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { authEntity } from "./auth.entity";

@Entity('superAdmin')
export class superAdminEntity extends parentEntity{
    @Column()
    name:string

    @Column({nullable:true})
    photo:string

    @OneToOne(()=>authEntity,(auth)=>auth.superAdmin)
    @JoinColumn({name:'authId'})
    auth:authEntity;
}