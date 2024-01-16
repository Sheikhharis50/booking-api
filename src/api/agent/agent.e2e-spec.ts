import request from 'supertest';
import { mockMiddleware } from '@/utils/mock';
import { ITestServer } from '@/interfaces/testServer';
import { DatabaseModule } from '@/database/module';
import { ConfigModule } from '@/config/module';
import { Test, TestingModule } from '@nestjs/testing';
import { AgentModule } from './agent.module';
import { NestApplication } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { MockAgentAuthMiddleware } from '@/middlewares/agent-auth.mock';

describe('Agent', () => {
  let app: NestApplication;
  let server: ITestServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule, AgentModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    mockMiddleware(
      app,
      AgentModule,
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

  describe('GET /agent', () => {
    it('should return 200', async () => {
      const response = await server.get('/agent');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.count).toBe(2);
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe('GET /agent/:id', () => {
    it('should return 200', async () => {
      const response = await server.get(`/agent/${1}`);
      expect(response.status).toBe(200);
    });
  });
});
