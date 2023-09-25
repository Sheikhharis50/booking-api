import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentAuthMiddleware } from '@/middlewares/agent-auth';
import { Agent } from '../agent/agent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Agent])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AgentAuthMiddleware)
      .forRoutes(
        { path: '/user', method: RequestMethod.GET },
        { path: '/user/:id', method: RequestMethod.GET },
      );
  }
}
