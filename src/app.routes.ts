import { Routes } from '@nestjs/core';
import { UserModule } from './api/user/user.module';
import { AgentModule } from './api/agent/agent.module';
import { RoleModule } from './api/role/role.module';
import { BookingModule } from './api/booking/booking.module';
import { PermissionModule } from './api/permission/permission.module';

export const routes: Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/v1',
        children: [
          {
            path: '/',
            module: UserModule,
          },
          {
            path: '/',
            module: AgentModule,
          },
          {
            path: '/',
            module: RoleModule,
          },
          {
            path: '/',
            module: BookingModule,
          },
          {
            path: '/',
            module: PermissionModule,
          },
        ],
      },
    ],
  },
];
