import request from 'supertest';
import { mockMiddleware } from '@/utils/mock';
import { ITestServer } from '@/interfaces/testServer';
import { DatabaseModule } from '@/database/module';
import { ConfigModule } from '@/config/module';
import { Test, TestingModule } from '@nestjs/testing';
import { NestApplication } from '@nestjs/core';
import { HttpStatus, RequestMethod } from '@nestjs/common';
import { MockAgentAuthMiddleware } from '@/middlewares/agent-auth.mock';
import { PermissionModule } from './permission.module';
import { PermissionType } from './permission.enum';
import { Permission } from './permission.entity';

describe('Permission', () => {
  let app: NestApplication;
  let server: ITestServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule, PermissionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    mockMiddleware(
      app,
      PermissionModule,
      MockAgentAuthMiddleware,
      {
        path: '/agent',
        method: RequestMethod.GET,
      },
      {
        path: '/agent/:id',
        method: RequestMethod.GET,
      },
    );
    await app.init();
    server = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /permission', () => {
    it('should return 200', async () => {
      const response = await server.get('/permission');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.count).toBe(12);
      expect(response.body.data).toHaveLength(12);
    });
  });

  describe('POST /permission', () => {
    it('should return 201', async () => {
      const response = await server.post('/permission').send({
        module: 'test',
        type: PermissionType.READ,
        description: 'test',
      });

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toBeDefined();
      expect(response.body.statusCode).toBe(HttpStatus.CREATED);
      expect(response.body.data).toEqual(
        expect.objectContaining<Partial<Permission>>({
          module: 'test',
          type: PermissionType.READ,
          description: 'test',
          id: 13,
          isDeleted: false,
        }),
      );
    });
  });
});
