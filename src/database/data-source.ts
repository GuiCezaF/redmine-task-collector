import { DataSource } from 'typeorm';
import { Task } from '../entities/Task';
import { env } from '../config/env';

const isCompiled = __filename.endsWith('.js');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [Task],
  migrations: [
    isCompiled
      ? './dist/database/migration/*.js'
      : './src/database/migration/*.ts',
  ],
  synchronize: false,
});
