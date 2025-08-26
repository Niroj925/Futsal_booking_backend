import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { baseEntity } from './base/base.entity';
import { futsalEntity } from './futsal.entity';
import { AvailabilityStatus } from 'src/common/enums';
import { bookingEntity } from './booking.entity';

@Entity('timeSlot')
export class timeSlotEntity extends baseEntity {
  @Column({ unique: true })
  startHr: number;

  @Column({ nullable: true, default: 0 })
  startMin: number;

  @Column({ unique: true })
  endHr: number;

  @Column({ nullable: true, default: 0 })
  endMin: number;

  @Column({ nullable: false, default: AvailabilityStatus.AVAILABLE })
  status: AvailabilityStatus;

  @ManyToOne(() => futsalEntity, (futsal) => futsal.timeSlot)
  futsal: futsalEntity;

  @OneToMany(() => bookingEntity, (booking) => booking.timeSlot)
  booking: bookingEntity[];
}
