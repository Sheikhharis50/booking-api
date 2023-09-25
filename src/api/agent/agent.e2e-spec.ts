import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AgentModule } from './agent.module';

describe('Agent', () => {
  let app: INestApplication;
  let server;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AgentModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    server = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /agent', () => {
    it('should return 200 status', async () => {
      return server.get('/agent').expect(200);
    });
  });
});
