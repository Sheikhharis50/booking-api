import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentAuthMiddleware } from '@/middlewares/agent-auth';
import { Agent } from '../agent/agent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Agent])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AgentAuthMiddleware)
      .forRoutes(
        { path: '/permission', method: RequestMethod.GET },
        { path: '/permission', method: RequestMethod.POST },
      );
  }
}
