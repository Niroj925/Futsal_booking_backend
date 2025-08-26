import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { baseEntity } from "./base/base.entity";
import { paymentEntity } from "./payment.entity";
import { userEntity } from "./user.entity";
import { futsalCourtEntity } from "./futsalCourt.entity";
import { timeSlotEntity } from "./timeSlot.entity";
import { BookingStatus } from "src/common/enums";

@Entity('booking')
export class bookingEntity extends baseEntity{
    @Column()
    bookingDate:Date;

    @Column({default:BookingStatus.PENDING})
    status:BookingStatus;

    @ManyToOne(()=>futsalCourtEntity,(court)=>court.booking)
    court:futsalCourtEntity;

    @OneToOne(()=>paymentEntity,payment=>payment.booking)
    payment:paymentEntity;

    @ManyToOne(()=>userEntity,user=>user.booking)
    user:userEntity;

    @ManyToOne(()=>timeSlotEntity,slot=>slot.booking)
    timeSlot:timeSlotEntity;    
}