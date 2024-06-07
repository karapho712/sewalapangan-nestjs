import { Booking } from 'src/modules/booking/entities/booking.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { Status, additionalDataTransaction } from 'src/types';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction extends EntityRef {
  @Column()
  occupant: string;

  @Column()
  address: string;

  @Column()
  handphoneNumber: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'time' })
  startTime: Date;

  @Column({ type: 'time' })
  endTime: Date;

  @Column()
  total: number;

  @Column()
  courtName: string; //Name from court

  @Column({ type: 'jsonb' })
  additionalData: additionalDataTransaction;

  @Column({ type: 'enum', enum: Status, default: Status.BOOKED })
  status: string;

  @ManyToOne('bookings', 'id', { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'bookingId' })
  booking: EntityRef<Booking>;

  // Meta

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne('staffs', 'id', { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: EntityRef<Staff>;

  @ManyToOne('staffs', 'id', { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: EntityRef<Staff>;
}
