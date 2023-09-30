import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { ILike, Repository } from 'typeorm';
import { CreatePermissionDto } from './permission.dto';
import { IResponse } from '@/interfaces/response';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async list(): Promise<IResponse<Permission>> {
    const [permissions, count] = await this.permissionRepository.findAndCount({
      where: {
        isDeleted: false,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      count,
      data: permissions,
    };
  }

  async create(createDto: CreatePermissionDto): Promise<IResponse<Permission>> {
    try {
      if (
        await this.permissionRepository.countBy({
          module: ILike(`${createDto.module}`),
          type: createDto.type,
          isDeleted: false,
        })
      ) {
        throw new HttpException(
          'Permission already exists',
          HttpStatus.CONFLICT,
        );
      }

      const instance = await this.permissionRepository.save(
        this.permissionRepository.create(createDto),
      );

      return {
        statusCode: HttpStatus.CREATED,
        data: instance,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
