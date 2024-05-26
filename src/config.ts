import {SequelizeOptions} from "sequelize-typescript";
import { config } from 'dotenv';
config()

const { env } = process;

export const port = env.PORT || 3000;
export const dbConfig: SequelizeOptions = {
    dialect: 'postgres',
    port: Number(env.PG_PORT),
    host: env.PG_HOST,
    username: env.PG_USER,
    password: env.PG_PASSWORD,
    database: env.PG_DATABASE,
    logging: false,
}