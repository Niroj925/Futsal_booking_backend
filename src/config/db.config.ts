import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

const databaseConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.PG_HOST,
    port: 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: true,//process.env.NODE-ENV==='Development'
    logging: false,//process.env.NODE-ENV==='Development'
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // ssl: {
    //     rejectUnauthorized: false
    // },
    extra: {
        "options": "-c timezone=UTC"
    }
};

export default databaseConfig;  