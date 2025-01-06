import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { authEntity } from "./auth.entity";
import { bookingEntity } from "./booking.entity";
import { reviewEntity } from "./review.entity";


@Entity('user')
export class userEntity extends parentEntity{
    @Column()
    name:string;

    @Column()
    address:string;

    @Column({nullable:true})
    phone:string;

    @Column({nullable:true})
    photo:string;

    @OneToOne(()=>authEntity,(auth)=>auth.user)
    @JoinColumn({name:'userAuth'})
    auth:authEntity;

    @OneToMany(()=>bookingEntity,booking=>booking.user)
    booking:bookingEntity[];

    @OneToOne(()=>reviewEntity,review=>review.user)
    review:reviewEntity;
}