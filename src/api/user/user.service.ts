import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { IResponse } from '@/interfaces/response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async list(): Promise<IResponse<User>> {
    const usersQuery = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        'agent',
        'agent',
        'agent.userId = user.id AND (agent.isDeleted = false)',
      )
      .where({ isDeleted: false })
      .andWhere('agent.id is NULL');

    const [users, count] = await usersQuery.getManyAndCount();
    return {
      statusCode: HttpStatus.OK,
      count,
      data: users,
    };
  }

  async find(id: number): Promise<IResponse<User>> {
    try {
      const usersQuery = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect(
          'agent',
          'agent',
          'agent.userId = user.id AND (agent.isDeleted = false)',
        )
        .where({ id, isDeleted: false })
        .andWhere('agent.id is NULL');

      const instance = await usersQuery.getOne();

      if (!instance) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
