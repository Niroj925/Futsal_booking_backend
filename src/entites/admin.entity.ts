import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { authEntity } from "./auth.entity";
import { futsalEntity } from "./futsal.entity";
import { reviewEntity } from "./review.entity";


@Entity('admin')
export class adminEntity extends parentEntity{
    @Column()
    name:string;

    @Column({type:'bigint', nullable:true})
    phone:string;

    @Column({nullable:true})
    photo:string;

    @OneToOne(()=>authEntity,(auth)=>auth.admin)
    @JoinColumn({name:'adminAuth'})
    auth:authEntity;

    @OneToOne(()=>futsalEntity,(futsal)=>futsal.admin)
    futsal:futsalEntity;

    @OneToMany(()=>reviewEntity,review=>review.admin,)
    review:reviewEntity[];
}