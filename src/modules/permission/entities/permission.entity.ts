import { kebabCase } from 'lodash';
import { Staff } from 'src/modules/staff/entities/staff.entity';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import {
  Entity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'permissions' })
export class Permission extends EntityRef {
  @BeforeInsert()
  @BeforeUpdate()
  dotCase() {
    this.key = kebabCase(this.key).replace(/-/g, '.');
  }

  @Column()
  name: string;

  @Column()
  key: string;

  // Meta

  @ManyToOne('staffs', 'id', { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'createdBy' })
  createdBy: EntityRef<Staff>;

  @ManyToOne('staffs', 'id', { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: EntityRef<Staff>;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
