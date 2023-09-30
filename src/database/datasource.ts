import { DataSource } from 'typeorm';
import configs from '../config/database';

export default (() => {
  const dbConfig = { ...configs() };
  return new DataSource({
    type: 'sqlite',
    database: dbConfig.database.toString(),
    entities: dbConfig.entities,
    migrations: dbConfig.migrations,
    logger: 'advanced-console',
    logging: true,
    synchronize: false,
  });
})();
