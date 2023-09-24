import { GenericEntity } from '@/common/generic.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from '../permission/permission.entity';

@Entity()
export class Role extends GenericEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', length: 1000, default: '' })
  description: string;

  @ManyToMany(() => Permission, (permission) => permission.id)
  @JoinTable({ name: 'role_permissions' })
  permissions: Permission[];
}
