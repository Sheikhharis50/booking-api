import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { ILike, In, Repository } from 'typeorm';
import { CreateRoleDto } from './role.dto';
import { Permission } from '../permission/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async list(): Promise<Role[]> {
    return this.roleRepository.find({
      where: {
        isDeleted: false,
      },
    });
  }

  async create(createDto: CreateRoleDto): Promise<Role> {
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

      return instance;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<string> {
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

      return 'Role is deleted';
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Failed', HttpStatus.BAD_REQUEST);
    }
  }
}
