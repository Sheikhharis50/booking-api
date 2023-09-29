import { OrmModuleOptions } from '@/interfaces/ormOptions';

export default (): OrmModuleOptions => ({
  type: 'sqlite',
  database: `${process.cwd()}/src/database/${
    process.env.DATABASE_NAME || 'bookings'
  }.sqlite3`,
  logging: process.env.DATABASE_LOGGING === 'true',
  synchronize: process.env.DATABASE_SYNC === 'true',
  dropSchema: process.env.DATABASE_DROPSCHEMA === 'true',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  seeds: [__dirname + '/../database/seeds/**/*{.ts,.js}'],
  factories: [__dirname + '/../database/factories/**/*{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  migrationsRun: process.env.DATABASE_MIGRATIONS_RUN === 'true',
});
