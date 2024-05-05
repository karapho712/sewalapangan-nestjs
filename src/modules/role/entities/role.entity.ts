import { kebabCase } from 'lodash';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { Staff } from 'src/modules/staff/entities/staff.entity';
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

@Entity({ name: 'roles' })
export class Role extends EntityRef {
  @BeforeInsert()
  @BeforeUpdate()
  kebabCaseSlug() {
    this.slug = kebabCase(this.slug);
  }

  @Column()
  name: string;

  @Column()
  slug: string;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'permissionId' },
  })
  permissions: EntityRef<Permission>[] | Permission[];

  //   Metadata

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
