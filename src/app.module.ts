import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/module';
import { DatabaseModule } from '@/database/module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UserModule } from './api/user/user.module';
import { AgentModule } from './api/agent/agent.module';
import { RoleModule } from './api/role/role.module';
import { BookingModule } from './api/booking/booking.module';
import { PermissionModule } from './api/permission/permission.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AgentModule,
    RoleModule,
    BookingModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
