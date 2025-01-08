import { Column, Entity, ManyToOne, OneToOne } from "typeorm";
import { parentEntity } from ".";
import { paymentEntity } from "./payment.entity";
import { userEntity } from "./user.entity";
import { futsalCourtEntity } from "./futsalCourt.entity";

@Entity('booking')
export class bookingEntity extends parentEntity{
    @Column()
    bookingDate:Date;

    @Column()
    startAt:Date;

    @Column()
    endAt:Date;

    @Column()
    status:string;

    @ManyToOne(()=>futsalCourtEntity,(court)=>court.booking)
    court:futsalCourtEntity;

    @OneToOne(()=>paymentEntity,payment=>payment.booking)
    payment:paymentEntity;

    @ManyToOne(()=>userEntity,user=>user.booking)
    user:userEntity;
}