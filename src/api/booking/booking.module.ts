import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { ClientController } from './client.controller';
import { AgentAuthMiddleware } from '@/middlewares/agent-auth';
import { Agent } from '../agent/agent.entity';
import { User } from '../user/user.entity';
import { BusinessController } from './business.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Agent, User])],
  providers: [BookingService],
  controllers: [ClientController, BusinessController],
})
export class BookingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AgentAuthMiddleware)
      .forRoutes(
        { path: '/client/scheduler', method: RequestMethod.GET },
        { path: '/client/booking', method: RequestMethod.POST },
        { path: '/client/booking/:id', method: RequestMethod.DELETE },
      );
  }
}
