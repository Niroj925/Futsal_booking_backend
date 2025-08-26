import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { baseEntity } from './base/base.entity';
import { adminEntity } from './admin.entity';
import { futsalCourtEntity } from './futsalCourt.entity';
import { futsalImageEntity } from './futsalImage.entity';
import { timeSlotEntity } from './timeSlot.entity';

@Entity('futsal')
export class futsalEntity extends baseEntity {
  @Column()
  description: string;

  @Column()
  location: string;

  @Column({ type: 'float', default: null })
  latitude: number;

  @Column({ type: 'float', default: null })
  longitude: number;

  @Column()
  openAt: string;

  @Column()
  closeAt: string;

  @OneToOne(() => adminEntity, (auth) => auth.futsal)
  @JoinColumn({ name: 'futsalAdmin' })
  admin: adminEntity;

  @OneToMany(() => futsalCourtEntity, (court) => court.futsal)
  court: futsalCourtEntity[];

  @OneToMany(() => futsalImageEntity, (court) => court.futsal)
  image: futsalImageEntity[];

  @OneToMany(() => timeSlotEntity, (slot) => slot.futsal, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  timeSlot: timeSlotEntity[];
}
