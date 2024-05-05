import { hash } from 'bcrypt';
import { Role } from 'src/modules/role/entities/role.entity';
import { EntityRef } from 'src/utils/entity-ref-abstract.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: 'staffs_roles',
    joinColumn: { name: 'staffId' },
    inverseJoinColumn: { name: 'roleId' },
  })
  roles: EntityRef<Role>[] | Role[];

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
