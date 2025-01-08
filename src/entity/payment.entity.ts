import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { bookingEntity } from "./booking.entity";
import { priceEntity } from "./priceSchema.entity";
import { paymentMethod, paymentStatus } from "src/common/constants/index.constant";

@Entity('payment')
export class paymentEntity extends parentEntity{

    @Column({nullable:true})
    status:paymentStatus;

    @Column({nullable:true})
    method:paymentMethod;

    @Column({nullable:true})
    proof:string;

    @Column({nullable:true})
    comment:string;

    @OneToOne(()=>priceEntity,(price)=>price.payment)
    @JoinColumn({name:'priceId'})
    price:priceEntity;

    @OneToOne(()=>bookingEntity,booking=>booking.payment)
    @JoinColumn({name:'bookingId'})
    booking:bookingEntity;
}
