import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { baseEntity } from "./base/base.entity";
import { bookingEntity } from "./booking.entity";
import { PaymentMethod, PaymentStatus } from "src/common/enums";

@Entity('payment')
export class paymentEntity extends baseEntity{

    @Column({nullable:true,default:PaymentStatus.PENDING})
    status:PaymentStatus;

    @Column({nullable:true})
    method:PaymentMethod;

    @Column({nullable:true,default:null})
    proof:string;

    @Column({nullable:true})
    comment:string; 

    @Column()
    amount:number;

    @OneToOne(()=>bookingEntity,booking=>booking.payment)
    @JoinColumn({name:'bookingId'})
    booking:bookingEntity;
}
