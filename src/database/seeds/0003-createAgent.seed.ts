import { Agent } from '@/api/agent/agent.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateAgent implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const agents: Partial<Agent>[] = [
      {
        userId: 1,
        roleId: 1,
      },
      {
        userId: 2,
        roleId: 2,
      },
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Agent)
      .values(agents)
      .execute();
  }
}
