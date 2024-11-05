import { DataSource } from 'typeorm';
import { Task } from '../entities/Task';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/database/data/database.sqlite',
  entities: [Task],
  migrations: ['./src/database/migration/*.ts'],
  synchronize: false,
});
