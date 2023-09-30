import { DataSource } from 'typeorm';
import configs from '../config/database';
import env from '../utils/env';
import { join } from 'path';

export default (() => {
  const dbConfig = { ...configs() };
  return new DataSource({
    type: 'sqlite',
    database: join('dist', `${env('DATABASE_NAME') || 'bookings'}.sqlite3`),
    entities: dbConfig.entities,
    migrations: dbConfig.migrations,
    logger: 'advanced-console',
    logging: dbConfig.logging,
    synchronize: dbConfig.synchronize,
  });
})();
