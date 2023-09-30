import * as request from 'supertest';

export interface ITestServer {
  get: (url: string) => Promise<request.Response>;
}
