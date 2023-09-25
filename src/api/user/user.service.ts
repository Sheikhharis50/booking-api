import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async list(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async find(id: number): Promise<User> {
    try {
      const instance = await this.userRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!instance) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return instance;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
