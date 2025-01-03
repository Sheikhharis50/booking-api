import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { GenericEntity } from '../common/generic.entity';
import { Permission } from '../permission/permission.entity';

@Entity()
export class Role extends GenericEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @ManyToMany(() => Permission, (permission) => permission.id)
  @JoinTable({ name: 'role_permissions' })
  permissions: Permission[];
}
