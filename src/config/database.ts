import { OrmModuleOptions } from '@/interfaces/ormOptions';
import { join } from 'path';

export default () =>
  /*
  |--------------------------------------------------------------------------
  | Database Connection
  |--------------------------------------------------------------------------
  |
  | Here you may specify which of the database connections you wish
  | to use as your default connection for all database work.
  |
  */

  ({
    type: 'sqlite',
    database: join(
      'dist',
      `${process.env.DATABASE_NAME || 'bookings'}.sqlite3`,
    ),
    entities: [join(__dirname, '../', '**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../', 'database/migrations/**/*{.ts,.js}')],
    migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
    logging: process.env.DATABASE_LOGGING === 'true' || true,
    synchronize: process.env.DATABASE_SYNC === 'true',
    dropSchema: process.env.DATABASE_DROPSCHEMA === 'true',
  } as OrmModuleOptions);
