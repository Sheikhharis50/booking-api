import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import AppConfig from './app';
import DatabaseConfig from './database';

@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      isGlobal: true,
      load: [
        () => ({ app: AppConfig() }),
        () => ({ database: DatabaseConfig() }),
      ],
    }),
  ],
})
export class ConfigModule {}
