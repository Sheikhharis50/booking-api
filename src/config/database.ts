import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { join } from 'path';

export default (): PostgresConnectionOptions =>
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
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'bookings',
    entities: [
      join(__dirname, '../', '**/*.entity{.ts,.js}'),
      'node_modules/nestjs-admin/**/*.entity.js',
    ],
    migrations: [join(__dirname, '../', 'database/migrations/**/*{.ts,.js}')],
    migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
    logging: (process.env.DATABASE_LOGGING || 'true') === 'true',
    synchronize: process.env.DATABASE_SYNC === 'true',
    dropSchema: process.env.DATABASE_DROPSCHEMA === 'true',
  });
