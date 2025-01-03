import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/module';
import { DatabaseModule } from '@/database/module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './api/user/user.module';
import { AgentModule } from './api/agent/agent.module';
import { RoleModule } from './api/role/role.module';
import { BookingModule } from './api/booking/booking.module';
import { PermissionModule } from './api/permission/permission.module';
import { routes } from './app.routes';

@Module({
  imports: [
    UserModule,
    AgentModule,
    RoleModule,
    BookingModule,
    PermissionModule,
    ConfigModule,
    DatabaseModule,
    RouterModule.register(routes),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
