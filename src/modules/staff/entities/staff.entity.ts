import { hash } from 'bcrypt';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'staffs' })
export class Staff extends EntityRef {
  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string) {
    this.password = await hash(password || this.password, 10);
  }

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  //   META
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne('staffs', 'id', { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy: EntityRef<Staff>;

  @ManyToOne('staffs', 'id', { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: EntityRef<Staff>;
}
