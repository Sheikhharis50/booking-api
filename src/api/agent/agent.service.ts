import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Agent } from './agent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from '@/interfaces/response';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {}

  async list(): Promise<IResponse<Agent>> {
    const [agents, count] = await this.agentRepository.findAndCount({
      where: {
        isDeleted: false,
      },
      relations: ['user', 'role'],
    });

    return {
      statusCode: HttpStatus.OK,
      count,
      data: agents,
    };
  }

  async find(id: number): Promise<IResponse<Agent>> {
    try {
      const instance = await this.agentRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
        relations: ['user', 'role'],
      });

      if (!instance) {
        throw new HttpException('Agent not found', HttpStatus.NOT_FOUND);
      }

      return {
        statusCode: HttpStatus.OK,
        data: instance,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
