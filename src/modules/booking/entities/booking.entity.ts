import { Court } from 'src/modules/court/entities/court.entity';
import { RentalEquipment } from 'src/modules/rental-equipment/entities/rental-equipment.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { Status } from 'src/types';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'bookings' })
export class Booking extends EntityRef {
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
  total: number; //Price court + sum rental equipments

  @Column({ type: 'enum', enum: Status, default: Status.BOOKED })
  status: string;

  @ManyToOne('courts', 'id', { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'courtId' })
  court: EntityRef<Court>;

  @ManyToMany(() => RentalEquipment, { eager: true })
  @JoinTable({
    name: 'booking_rental_equipments',
    joinColumn: { name: 'bookingId' },
    inverseJoinColumn: { name: 'rentalEquipmentId' },
  })
  rentalEquipments: EntityRef<RentalEquipment>[] | RentalEquipment[];

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
