import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { baseEntity } from './base/base.entity';
import { authEntity } from './auth.entity';
import { futsalEntity } from './futsal.entity';
import { reviewEntity } from './review.entity';

@Entity('admin')
export class adminEntity extends baseEntity {
  @Column()
  name: string;

  @Column({ type: 'bigint', unique: true, nullable: true })
  contact: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: true })
  photo: string;

  @OneToOne(() => authEntity, (auth) => auth.admin, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'adminAuth' })
  auth: authEntity;

  @OneToOne(() => futsalEntity, (futsal) => futsal.admin, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  futsal: futsalEntity;

  @OneToMany(() => reviewEntity, (review) => review.admin, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  review: reviewEntity[];
}
