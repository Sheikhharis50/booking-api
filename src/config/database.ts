import { OrmModuleOptions } from '@/interfaces/ormOptions';
import { join } from 'path';

/**
 * The function `getSqliteDBName` returns the name of the SQLite database file based on the environment
 * and database name.
 * @returns The function `getSqliteDBName` returns the path to the SQLite database file with the name
 * "bookings" concatenated with the environment name (if provided) and the file extension ".sqlite3".
 */
const getSqliteDBName = () => {
  let path = __dirname + '/../database';
  path = join(path, process.env.DATABASE_NAME || 'bookings');
  path += process.env.NODE_ENV ? `_${process.env.NODE_ENV}` : '';
  return path + '.sqlite3';
};

export default (): OrmModuleOptions => ({
  type: 'sqlite',
  database: getSqliteDBName(),
  logging: process.env.DATABASE_LOGGING === 'true' || true,
  synchronize: process.env.DATABASE_SYNC === 'true' || true,
  dropSchema: process.env.DATABASE_DROPSCHEMA === 'true' || false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  seeds: [__dirname + '/../database/seeds/**/*{.ts,.js}'],
  factories: [__dirname + '/../database/factories/**/*{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true' || true,
});
