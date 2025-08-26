import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { baseEntity } from './base/base.entity';
import { futsalEntity } from './futsal.entity';
import { bookingEntity } from './booking.entity';
import { priceEntity } from './price.entity';
import { futsalImageEntity } from './futsalImage.entity';
import { AvailabilityStatus } from 'src/common/enums';

@Entity('futsalCourt')
export class futsalCourtEntity extends baseEntity {
  @Column()
  name: string;

  @Column()
  dimension: string;

  @Column()
  surfaceType: string;

  @Column()
  availability: AvailabilityStatus;

  @ManyToOne(() => futsalEntity, (futsal) => futsal.court)
  futsal: futsalEntity;

  @OneToMany(() => bookingEntity, (booking) => booking.court)
  booking: bookingEntity[];

  @OneToMany(() => priceEntity, (price) => price.court)
  price: priceEntity[];

  @OneToMany(() => futsalImageEntity, (image) => image.court, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  image: futsalImageEntity[];

}
