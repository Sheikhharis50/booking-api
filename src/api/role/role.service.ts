import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { ILike, In, Repository } from 'typeorm';
import { CreateRoleDto } from './role.dto';
import { Permission } from '../permission/permission.entity';
import { IResponse } from '@/interfaces/response';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async list(): Promise<IResponse<Role>> {
    const [roles, count] = await this.roleRepository.findAndCount({
      where: {
        isDeleted: false,
      },
    });
    return {
      statusCode: HttpStatus.OK,
      count,
      data: roles,
    };
  }

  async create(createDto: CreateRoleDto): Promise<IResponse<Role>> {
    try {
      if (
        await this.roleRepository.countBy({
          name: ILike(`%${createDto.name}%`),
          isDeleted: false,
        })
      ) {
        throw new HttpException('Role already exists', HttpStatus.CONFLICT);
      }

      const permissions = await this.permissionRepository.findBy({
        id: In(createDto.permissionIds),
        isDeleted: false,
      });

      if (permissions.length !== [...new Set(createDto.permissionIds)].length) {
        throw new HttpException(
          'Some permissions are not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const instance = await this.roleRepository.save(
        this.roleRepository.create({ ...createDto, permissions }),
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
      const instance = await this.roleRepository.findOneBy({
        id,
        isDeleted: false,
      });

      if (!instance) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      instance.isDeleted = true;
      this.roleRepository.save(instance);

      return {
        statusCode: HttpStatus.OK,
        message: 'Role is deleted',
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
