import { Permission } from '@/api/permission/permission.entity';
import { PermissionType } from '@/api/permission/permission.enum';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreatePermission implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const permissions: Partial<Permission>[] = [
      {
        module: 'agent',
        type: PermissionType.READ,
      },
      {
        module: 'agent',
        type: PermissionType.WRITE,
      },
      {
        module: 'client',
        type: PermissionType.READ,
      },
      {
        module: 'client',
        type: PermissionType.WRITE,
      },
      {
        module: 'permission',
        type: PermissionType.READ,
      },
      {
        module: 'permission',
        type: PermissionType.WRITE,
      },
      {
        module: 'role',
        type: PermissionType.READ,
      },
      {
        module: 'role',
        type: PermissionType.WRITE,
      },
      {
        module: 'user',
        type: PermissionType.READ,
      },
      {
        module: 'user',
        type: PermissionType.WRITE,
      },
      {
        module: 'business',
        type: PermissionType.READ,
      },
      {
        module: 'business',
        type: PermissionType.WRITE,
      },
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(permissions)
      .execute();
  }
}
