import { GenericEntity } from '@/common/generic.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Agent } from '../agent/agent.entity';

@Entity()
export class Booking extends GenericEntity {
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => Agent, (agent) => agent.id, { nullable: false })
  @JoinColumn({ name: 'agentId' })
  agent: Agent;

  @Column({ type: 'int' })
  agentId: number;

  @Column({ type: 'varchar', length: 100 })
  startAt: string;

  @Column({ type: 'varchar', length: 100 })
  finishAt: string;
}
