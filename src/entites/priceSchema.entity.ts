import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { parentEntity } from '.';
import { futsalCourtEntity } from './futsalCourt.entity';
import { paymentEntity } from './payment.entity';

@Entity('priceSchem')
export class priceEntity extends parentEntity {
  @Column({nullable:true})
  name: string;

  @Column()
  price: number;

  @Column()
  durationMinute: number;

  @ManyToOne(()=>futsalCourtEntity,court=>court.price)
  court:futsalCourtEntity;

  @OneToOne(()=>paymentEntity,(payment)=>payment.price)
  payment:paymentEntity;
}
