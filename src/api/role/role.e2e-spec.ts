import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { RoleModule } from './role.module';

describe('Role', () => {
  let app: INestApplication;
  let server;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RoleModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    server = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });
});
