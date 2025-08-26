import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [`${__dirname}/entities/*{.ts,.js}`],
  migrations: [`${__dirname}/../../../migrations/*{.ts,.js}`],
  subscribers: [],
  // logger: 'advanced-console',
  // logging: ['schema'],
});
