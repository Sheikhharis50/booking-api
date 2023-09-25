import { Agent } from '@/api/agent/agent.entity';
import { PermissionType } from '@/api/permission/permission.enum';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';

export const AuthHeader = 'X-Agent-Id';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly ACCESS = {
    GET: PermissionType.READ,
    POST: PermissionType.WRITE,
    PUT: PermissionType.WRITE,
    PATCH: PermissionType.WRITE,
    DELETE: PermissionType.WRITE,
  };

  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const agentId = req.headers[AuthHeader.toLowerCase()];
    const type = this.ACCESS[req.method];
    const module = req.path.split('/')[2];

    if (!agentId || typeof agentId !== 'string') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const agent = await this.agentRepository.findOne({
      where: {
        id: parseInt(agentId),
        isDeleted: false,
      },
      relations: {
        role: {
          permissions: true,
        },
      },
    });
    if (!agent) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (
      !agent.role.permissions.find(
        (perm) => perm.type === type && perm.module === module,
      )
    ) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    next();
  }
}
