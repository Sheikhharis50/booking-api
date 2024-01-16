import { NestMiddleware } from '@nestjs/common';

export class MockAgentAuthMiddleware implements NestMiddleware {
  use(req, res, next) {
    next();
  }
}
