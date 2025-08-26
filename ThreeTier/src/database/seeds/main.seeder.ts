// main.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { authEntity } from 'src/entity/auth.entity';
import { superAdminEntity } from 'src/entity/superAdmin.entity';
import { userEntity } from 'src/entity/user.entity';
import { roleType } from 'src/common/constants';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // Create factories
    const authFactory = factoryManager.get(authEntity);
    const superAdminFactory = factoryManager.get(superAdminEntity);
    const userFactory = factoryManager.get(userEntity);

    // Create super admin
    console.log('Seeding super admin...');
    const superAdminAuth = await authFactory.save({
      email: 'superadmin@example.com',
      role: roleType.superAdmin
    });
    
    const superAdmin = await superAdminFactory.save({
      auth: superAdminAuth
    });

    // Create regular users
    console.log('Seeding users...');
    for (let i = 0; i < 10; i++) {
      const userAuth = await authFactory.save({
        role: roleType.user
      });
      
      await userFactory.save({
        auth: userAuth
      });
    }
  }
}
