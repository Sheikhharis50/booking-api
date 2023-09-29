import * as request from 'supertest';
import { sqliteTestDBOptions } from '@/utils/db';
import { removeFile } from '@/utils/file';
import { mockMiddleware } from '@/utils/mock';
import { ITestServer } from '@/interfaces/testServer';
import { Test, TestingModule } from '@nestjs/testing';
import { AgentModule } from './agent.module';
import { NestApplication } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RequestMethod } from '@nestjs/common';
import { MockAgentAuthMiddleware } from '@/middlewares/agent-auth.mock';

describe('Agent', () => {
  let app: NestApplication;
  let dbConfigs: TypeOrmModuleOptions;
  let server: ITestServer;

  beforeAll(async () => {
    dbConfigs = sqliteTestDBOptions();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dbConfigs), AgentModule],
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
    removeFile(dbConfigs.database.toString());
  });

  describe('GET /agent', () => {
    it('should return 200', async () => {
      const response = await server.get('/agent');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /agent/:id', () => {
    it('should return 200', async () => {
      const response = await server.get(`/agent/${1}`);
      expect(response.status).toBe(200);
    });
  });
});
