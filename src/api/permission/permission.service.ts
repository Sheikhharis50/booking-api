import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { ILike, Repository } from 'typeorm';
import { CreatePermissionDto } from './permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async list(): Promise<Permission[]> {
    return this.permissionRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async create(createDto: CreatePermissionDto): Promise<Permission> {
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

      return instance;
    } catch (err) {
      console.error(err);
      if (err instanceof HttpException) throw err;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
