import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as dotenv from "dotenv";
dotenv.config();
//TODO: improve typeORM configuration

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['**/*.entity.js'],
};