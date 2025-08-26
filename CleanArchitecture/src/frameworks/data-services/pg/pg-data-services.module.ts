import { Module } from '@nestjs/common';
import { appDataSourceProviders } from './providers/appDatabase.provider';
import { IDataServices } from 'src/core/abstracts';
import { PgDataServices } from './pg-data-services.service';
import providers from './providers';
import { EnvironmentConfigModule } from 'src/application/config/environment-config.module';
import { ClsServiceModule } from 'src/services/cls-store/cls-store.module';
// import { DefaultSeeder } from './seeders/default.seeder';
import { AuditSubscriber } from './subscribers/audit.subscriber';
import { DataSource } from 'typeorm';
import InjectableString from 'src/common/injectable.string';

@Module({
  imports: [EnvironmentConfigModule, ClsServiceModule],
  providers: [
    ...appDataSourceProviders,
    ...providers,
    AuditSubscriber,
    {
      provide: IDataServices,
      useClass: PgDataServices,
    },
    // DefaultSeeder,
    // {
    //   provide: DefaultSeeder,
    //   useClass: DefaultSeeder,
    // },
       {
      provide: DataSource,
      useExisting: InjectableString.APP_DATA_SOURCE,
    },
  ],
  exports: [...appDataSourceProviders, IDataServices],
})
export class PgDataServicesModule {}
