import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { adminEntity } from "./admin.entity";
import {  futsalCourtEntity } from "./futsalCourt.entity";
import { futsalImageEntity } from "./futsalImage.entity";

@Entity('futsal')
export class futsalEntity extends parentEntity{
    @Column()
    description:string;

    @Column()
    location:string;

    @Column({type:'float', default:null})
    latitude:number;

    @Column({type:'float', default:null})
    longitude:number;

    @Column()
    openAt:string;

    @Column()
    closeAt:string;

    @OneToOne(()=>adminEntity,(auth)=>auth.futsal)
    @JoinColumn({name:'futsalAdmin'})
    admin:adminEntity;

    @OneToMany(()=>futsalCourtEntity,(court)=>court.futsal)
    court:futsalCourtEntity[];

    @OneToMany(()=>futsalImageEntity,(court)=>court.futsal)
    image:futsalImageEntity[];
}