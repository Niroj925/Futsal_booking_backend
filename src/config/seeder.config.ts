import { AuthFactory } from "src/database/seeds/auth.factory";
import { MainSeeder } from "src/database/seeds/main.seeder";
import { SuperAdminFactory } from "src/database/seeds/superAdmin.factory";
import { UserFactory } from "src/database/seeds/user.factory";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
require('dotenv').config();

 const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
    host: process.env.PG_HOST,
    port: 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: false,//process.env.NODE-ENV==='Development'
    logging: false,//process.env.NODE-ENV==='Development'
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // ssl: {
    //     rejectUnauthorized: false
    // },
    extra: {
        "options": "-c timezone=UTC"
    },
  factories: [AuthFactory, SuperAdminFactory, UserFactory],
  seeds: [MainSeeder],
};

console.log('DB Config:', {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE
});
export default options;
