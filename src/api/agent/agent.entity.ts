import { GenericEntity } from '@/common/generic.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';

@Entity()
export class Agent extends GenericEntity {
  @ManyToOne(() => Role, (role) => role.id, { nullable: false })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column({ type: 'int' })
  roleId: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int' })
  userId: number;
}
