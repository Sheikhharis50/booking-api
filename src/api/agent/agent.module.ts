import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { AuthMiddleware } from '@/middlewares/auth';
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
      .apply(AuthMiddleware)
      .forRoutes({ path: '/agents', method: RequestMethod.GET });
  }
}
