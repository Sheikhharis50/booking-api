import { Entity, Column } from 'typeorm';
import { GenericEntity } from '../common/generic.entity';
import { PermissionType } from './permission.enum';

@Entity()
export class Permission extends GenericEntity {
  @Column({ type: 'varchar', length: 255 })
  module: string;

  @Column({ type: 'varchar', length: 255 })
  type: PermissionType;

  @Column({ type: 'text', default: '' })
  description: string;
}
