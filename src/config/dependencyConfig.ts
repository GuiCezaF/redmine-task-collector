import { AppDataSource } from '../database/data-source';
import { Task } from '../entities/Task';
import RedmineService from '../services/redmineService';
import TaskServices from '../services/taskServices';
import TaskController from '../controllers/taskController';
import Logger from '../utils/logger';

const logger = new Logger();

export const configureDependencies = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('DataSource has been initialized!');

    const redmineService = new RedmineService();
    const taskRepository = AppDataSource.getRepository(Task);
    const taskService = new TaskServices(taskRepository);
    const taskController = new TaskController(redmineService, taskService);

    return taskController;
  } catch (error) {
    logger.error('Error configuring dependencies:', error);
    throw new Error('Dependency configuration failed');
  }
};
