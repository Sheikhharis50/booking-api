import { join } from 'path';
import env from './utils/env';

const baseConfig = {
  type: 'sqlite',
  database: join('dist', `${env('DATABASE_NAME') || 'bookings'}.sqlite3`),
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'database/migrations/**/*.ts')],
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  synchronize: false,
  cli: {
    migrationsDir: join('src/database/migrations'),
  },
};

module.exports = baseConfig;
