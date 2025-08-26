import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { baseEntity } from "./base/base.entity";
import { adminEntity } from "./admin.entity";
import { userEntity } from "./user.entity";

@Entity('review')
export class reviewEntity extends baseEntity{
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