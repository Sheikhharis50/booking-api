import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { AuthMiddleware } from '@/middlewares/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Permission } from '../permission/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/role/list', method: RequestMethod.GET },
        { path: '/role/create', method: RequestMethod.POST },
        { path: '/role/:id/delete', method: RequestMethod.DELETE },
      );
  }
}
