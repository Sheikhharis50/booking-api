import { define } from 'typeorm-seeding';
import { randFullName, incrementalNumber, randEmail } from '@ngneat/falso';
import { User } from '@/api/user/user.entity';

const userIdFactory = incrementalNumber();

define(User, () => {
  const user = new User();
  user.id = userIdFactory();
  user.name = randFullName();
  user.email = randEmail();
  return user;
});
