import { HttpException, Logger } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/application/config/environment-config.service';
import InjectableString from 'src/common/injectable.string';
// import { DefaultSeeder } from '../seeders/default.seeder';
import { AppDataSource } from '../data-source';

export const appDataSourceProviders = [
  {
    provide: InjectableString.APP_DATA_SOURCE,
    // useFactory: async (defaultSeeder: DefaultSeeder) => {
    useFactory: async () => {
      // async function runInitialSeeders() {
      //   await defaultSeeder.seedRolesIfNotExists(
      //     AppDataSource.getRepository(RoleEntity),
      //   );
      // }
      try {
        await AppDataSource.initialize();
        Logger.log('Data source initialized', 'appDataSourceProviders');
        // await runInitialSeeders();
        return AppDataSource;
      } catch (error) {
        Logger.log(error, 'appDataSourceProviders');
        throw new HttpException(error.message, error.status);
      }
    },
    inject: [ EnvironmentConfigService],
  },
];
