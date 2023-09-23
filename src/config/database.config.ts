import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: `${process.cwd()}/src/database/${
      process.env.DATABASE_NAME || 'bookings'
    }.sqlite3`,
    logging: JSON.parse(process.env.DATABASE_LOGGING || 'false'),
    entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
);
