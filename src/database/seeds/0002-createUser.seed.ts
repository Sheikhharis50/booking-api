import { User } from '@/api/user/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateUser implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(2);
  }
}
