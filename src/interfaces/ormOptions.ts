import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface SeederOptions {
  seeds: string[];
  factories: string[];
}

export type OrmModuleOptions = SeederOptions & TypeOrmModuleOptions;
