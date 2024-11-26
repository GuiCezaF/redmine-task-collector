import { DataSource } from 'typeorm';
import { Task } from '../entities/Task';

const isCompiled = __filename.endsWith('.js');

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/database/data/database.sqlite',
  entities: [Task],
  migrations: [
    isCompiled
      ? './dist/database/migration/*.js'
      : './src/database/migration/*.ts',
  ],
  synchronize: false,
});
