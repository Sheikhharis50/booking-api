import { join } from 'path';
import env from './utils/env';

const baseConfig = {
  type: 'postgres',
  host: env('DATABASE_HOST') || 'localhost',
  port: parseInt(env('DATABASE_PORT') || '5432', 10),
  username: env('DATABASE_USER') || 'postgres',
  password: env('DATABASE_PASSWORD') || 'password',
  database: env('DATABASE_NAME') || 'bookings',
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'database/migrations/**/*.ts')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  synchronize: (env('DATABASE_SYNC') || 'false') === 'true',
  cli: {
    migrationsDir: join('src/database/migrations'),
  },
};

module.exports = baseConfig;
