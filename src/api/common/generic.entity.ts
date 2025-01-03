import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class GenericEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ type: 'boolean', default: false, select: false })
  isDeleted: boolean;
}
