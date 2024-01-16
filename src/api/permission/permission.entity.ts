import { Entity, Column } from 'typeorm';
import { GenericEntity } from '../common/generic.entity';
import { PermissionType } from './permission.enum';

@Entity()
export class Permission extends GenericEntity {
  @Column({ type: 'varchar', length: 255 })
  module: string;

  @Column({ type: 'varchar', length: 255 })
  type: PermissionType;

  @Column({ type: 'text', length: 1000, default: '' })
  description: string;
}
