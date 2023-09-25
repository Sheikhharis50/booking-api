import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBooking, QueryBooking } from './booking.dto';
import { getDateOfIsoWeek, sqliteDateStr } from '@/utils/date';
import { REQUEST } from '@nestjs/core';
import { AgentAuthRequest } from '@/middlewares/agent-auth';
import { User } from '../user/user.entity';

@Injectable()
export class BookingService {
  constructor(
    @Inject(REQUEST)
    private request: AgentAuthRequest,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async list(query: QueryBooking): Promise<Booking[]> {
    const where = {};

    if (query.week) {
      try {
        const [year, week] = query.week.split('-');
        const [start, end] = getDateOfIsoWeek(week, year);

        Object.assign(where, {
          startAt: MoreThanOrEqual(sqliteDateStr(start.toISOString())),
          finishAt: LessThan(sqliteDateStr(end.toISOString())),
        });
      } catch (error) {
        console.error(error);
        throw new HttpException(
          'Invalid weekdate format eg: YYYY-WW',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.bookingRepository.find({
      where: {
        ...where,
        isDeleted: false,
      },
      relations: ['user', 'agent'],
    });
  }

  async create(createDto: CreateBooking): Promise<Booking> {
    try {
      const user = await this.userRepository.findOneBy({
        id: createDto.userId,
        isDeleted: false,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return await this.bookingRepository.save(
        this.bookingRepository.create({
          ...createDto,
          startAt: sqliteDateStr(createDto.startAt),
          finishAt: sqliteDateStr(createDto.startAt),
          agent: this.request.agent,
        }),
      );
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<string> {
    try {
      const instance = await this.bookingRepository.findOneBy({
        id,
        isDeleted: false,
      });

      if (!instance) {
        throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
      }

      instance.isDeleted = true;
      this.bookingRepository.save(instance);

      return 'Booking is deleted';
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
