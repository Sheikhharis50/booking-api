import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Agent } from './agent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {}

  async list(): Promise<Agent[]> {
    return this.agentRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async find(id: number): Promise<Agent> {
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

      console.log(instance);

      return instance;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
