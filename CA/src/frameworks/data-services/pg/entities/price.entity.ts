import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { baseEntity } from "./base/base.entity";
import { futsalCourtEntity } from './futsalCourt.entity';
import { paymentEntity } from './payment.entity';

@Entity('priceSchem')
export class priceEntity extends baseEntity {
  @Column({nullable:true})
  name: string;

  @Column()
  price: number;

  @Column()
  durationMinute: number;

  @ManyToOne(()=>futsalCourtEntity,court=>court.price)
  court:futsalCourtEntity;
}
