import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseConfig = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  extra: {
    options: '-c timezone=UTC',
  },
});

export default databaseConfig;
