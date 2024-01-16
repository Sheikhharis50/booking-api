import * as request from 'supertest';

type ITestResponse = {
  send: (data: { [k: string]: string }) => Promise<request.Response>;
} & Promise<request.Response>;

export interface ITestServer {
  get: (url: string) => ITestResponse;
  post: (url: string) => ITestResponse;
}
