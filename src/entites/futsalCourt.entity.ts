import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { parentEntity } from ".";
import { futsalEntity } from "./futsal.entity";
import { bookingEntity } from "./booking.entity";
import { priceEntity } from "./priceSchema.entity";
import { futsalImageEntity } from "./futsalImage.entity";
import { availabilityStatus } from "src/common/constants/index.constant";

@Entity('futsalCourt')
export class futsalCourtEntity extends parentEntity{
    @Column()
    name:string;    

    @Column()
    dimension:string;

    @Column()
    surfaceType:string;

    @Column()
    availability:availabilityStatus;

    @ManyToOne(()=>futsalEntity,(futsal)=>futsal.court)
    futsal:futsalEntity;

    @OneToMany(()=>bookingEntity,booking=>booking.court)
    booking:bookingEntity[];


    @OneToMany(()=>priceEntity,price=>price.court)
    price:priceEntity[]

    @OneToMany(()=>futsalImageEntity,(image)=>image.court)
    image:futsalImageEntity[];
}