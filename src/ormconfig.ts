import { join } from 'path';
import { config } from 'dotenv';

const envConfig = config({
  path: join(
    __dirname,
    '../',
    `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
  ),
});

function env(key: string) {
  return ('parsed' in envConfig && envConfig.parsed[key]) || process.env[key];
}

const baseConfig = {
  type: 'sqlite',
  database: join('dist', `${env('DATABASE_NAME') || 'bookings'}.sqlite3`),
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'database/migrations/**/*.ts')],
  logger: 'advanced-console',
  logging: true,
  cli: {
    migrationsDir: join('src/database/migrations'),
  },
};

if (env('NODE_ENV') !== 'test') {
  module.exports = {
    synchronize: false,
    ...baseConfig,
  };
} else {
  module.exports = {
    dropSchema: true,
    synchronize: true,
    ...baseConfig,
  };
}
