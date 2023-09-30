import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBooking, QueryBooking } from './booking.dto';
import { getDateOfIsoWeek, sqliteDateStr } from '@/utils/date';
import { REQUEST } from '@nestjs/core';
import { AgentAuthRequest } from '@/middlewares/agent-auth';
import { User } from '../user/user.entity';
import { IResponse } from '@/interfaces/response';

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

  async list(query: QueryBooking): Promise<IResponse<Booking>> {
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

    const [bookings, count] = await this.bookingRepository.findAndCount({
      where: {
        ...where,
        isDeleted: false,
      },
      relations: ['user', 'agent'],
    });

    return {
      statusCode: HttpStatus.OK,
      count,
      data: bookings,
    };
  }

  async create(createDto: CreateBooking): Promise<IResponse<Booking>> {
    try {
      const user = await this.userRepository.findOneBy({
        id: createDto.userId,
        isDeleted: false,
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const instance = await this.bookingRepository.save(
        this.bookingRepository.create({
          ...createDto,
          startAt: sqliteDateStr(createDto.startAt),
          finishAt: sqliteDateStr(createDto.startAt),
          agent: this.request.agent,
        }),
      );

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

  async delete(id: number): Promise<IResponse> {
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

      return {
        statusCode: HttpStatus.OK,
        message: 'Booking is deleted',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
