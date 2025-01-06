import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { adminEntity } from "./admin.entity";
import { userEntity } from "./user.entity";

@Entity('review')
export class reviewEntity extends parentEntity{
    @Column()
    rating:number;

    @Column()
    review:string;

    @ManyToOne(()=>adminEntity,admin=>admin.review)
    admin:adminEntity;

    @OneToOne(()=>userEntity,user=>user.review)
    @JoinColumn({name:'userId'})
    user:userEntity
}