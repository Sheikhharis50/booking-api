import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AgentModule } from './api/agent/agent.module';
import { RoleModule } from './api/role/role.module';
import { BookingService } from './api/booking/booking.service';
import { BookingController } from './api/booking/booking.controller';
import { BookingModule } from './api/booking/booking.module';
import { PermissionModule } from './api/permission/permission.module';
import globalConfig from './config/global.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [globalConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    AgentModule,
    RoleModule,
    BookingModule,
    PermissionModule,
  ],
  controllers: [AppController, BookingController],
  providers: [AppService, BookingService],
})
export class AppModule {}
