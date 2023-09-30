import { Permission } from '@/api/permission/permission.entity';
import { Role } from '@/api/role/role.entity';
import { Connection, In } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class CreateRole implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    const permRepo = connection.getRepository(Permission);
    const [adminPerms, regularPerms] = await Promise.all([
      permRepo.findBy({ isDeleted: false }),
      permRepo.findBy({ id: In([3, 9]), isDeleted: false }),
    ]);

    const roles: Partial<Role>[] = [
      {
        id: 1,
        name: 'Admin',
        description: 'Admin role',
        permissions: adminPerms,
      },
      {
        id: 2,
        name: 'Regular',
        description: 'Regular role',
        permissions: regularPerms,
      },
    ];

    const rolePermissions = (() => {
      const objs = [];
      roles.forEach((role) => {
        role.permissions.forEach((perm) => {
          objs.push({
            roleId: role.id,
            permissionId: perm.id,
          });
        });
      });
      return objs;
    })();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(roles)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into('role_permissions')
      .values(rolePermissions)
      .execute();
  }
}
