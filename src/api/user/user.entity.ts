import { GenericEntity } from '@/common/generic.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { Booking } from '../booking/booking.entity';

@Entity()
export class User extends GenericEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @OneToMany(() => Booking, (booking) => booking.id)
  bookings: Booking[];
}
