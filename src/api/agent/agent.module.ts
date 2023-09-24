import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { AuthMiddleware } from '@/middlewares/auth';

@Module({
  providers: [AgentService],
  controllers: [AgentController],
})
export class AgentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/agents', method: RequestMethod.GET });
  }
}
