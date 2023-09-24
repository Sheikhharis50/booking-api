import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';

export const AuthHeader = 'X-Agent-Id';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // constructor(
  //   @InjectRepository(User) private userRepository: Repository<User>,
  //   private jwtService: JwtService,
  // ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const agentId = req.headers[AuthHeader.toLowerCase()];
    if (!agentId) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
