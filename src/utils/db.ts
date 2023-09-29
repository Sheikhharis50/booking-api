import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import configs from '@/config/database';
import { DataSourceOptions } from 'typeorm';

/**
 * The function `sqliteTestDBOptions` returns a modified version of the database configuration options
 * for a SQLite database, with the database name appended with "_test".
 * @returns a TypeOrmModuleOptions object.
 */
export const sqliteTestDBOptions = (): TypeOrmModuleOptions => {
  const dbConfigs = { ...configs() };
  const [dbName, dbExt] = dbConfigs.database.toString().split('.');
  dbConfigs.database = `${dbName}_test.${dbExt}`;
  return dbConfigs;
};

/**
 * The function returns the options for connecting to a SQLite test database.
 * @returns The function `sqliteTestDBDataSourceOptions` is returning an object of type
 * `DataSourceOptions`.
 */
export const sqliteTestDBDataSourceOptions = (): DataSourceOptions => {
  const dbConfigs = sqliteTestDBOptions();
  return {
    type: 'sqlite',
    database: dbConfigs.database.toString(),
    entities: dbConfigs.entities,
    synchronize: false,
  };
};
