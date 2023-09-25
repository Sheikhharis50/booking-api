import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { AgentAuthMiddleware } from '@/middlewares/agent-auth';
import { Agent } from './agent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, Role])],
  providers: [AgentService],
  controllers: [AgentController],
})
export class AgentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AgentAuthMiddleware)
      .forRoutes(
        { path: '/agent', method: RequestMethod.GET },
        { path: '/agent/:id', method: RequestMethod.GET },
      );
  }
}
