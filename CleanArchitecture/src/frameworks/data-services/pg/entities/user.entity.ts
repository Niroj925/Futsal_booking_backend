import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { baseEntity } from './base/base.entity';
import { authEntity } from './auth.entity';
import { bookingEntity } from './booking.entity';
import { reviewEntity } from './review.entity';

@Entity('user')
export class userEntity extends baseEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true,unique:true })
  contact: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  photo: string;

  @OneToOne(() => authEntity, (auth) => auth.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userAuth' })
  auth: authEntity;

  @OneToMany(() => bookingEntity, (booking) => booking.user)
  booking: bookingEntity[];

  @OneToOne(() => reviewEntity, (review) => review.user)
  review: reviewEntity;
}
