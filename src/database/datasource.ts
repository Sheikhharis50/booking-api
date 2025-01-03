import { DataSource } from 'typeorm';
import configs from '../config/database';

export default (() => {
  const dbConfig = { ...configs() };
  return new DataSource({
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database.toString(),
    entities: dbConfig.entities,
    migrations: dbConfig.migrations,
    logger: 'advanced-console',
    logging: dbConfig.logging,
    synchronize: dbConfig.synchronize,
  });
})();
