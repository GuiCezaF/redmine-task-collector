import 'reflect-metadata';
import { ILike, In, Repository } from 'typeorm';
import { Task } from '../entities/Task';
import Logger from '../utils/logger';

class TaskServices {
  private logger = new Logger();
  private taskRepository: Repository<Task>;

  constructor(taskRepository: Repository<Task>) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find();
      this.logger.success('Tasks retrieved sucessfully');

      return tasks;
    } catch (err) {
      throw new Error(`Error get all tasks!\n ${err}`);
    }
  }

  async getAtivedTasks(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find({
        where: {
          status: In(['Novo', 'Em andamento']),
        },
      });
      this.logger.success('Active tasks retrieved sucessfully');

      return tasks;
    } catch (err) {
      throw new Error(`Error get active tasks!\n ${err}`);
    }
  }

  async getFinishedTasks(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find({
        where: {
          status: In(['Fechado', 'Implementado']),
        },
      });
      this.logger.success('Finished tasks retrieved sucessfully');

      return tasks;
    } catch (err) {
      throw new Error(`Error get finished tasks!\n ${err}`);
    }
  }

  async getTaskByName(task_name: string): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.find({
        where: {
          title: ILike(`%${task_name.toLowerCase()}%`),
        },
      });
      this.logger.success('Tasks retrieved by name sucessfully');

      return tasks;
    } catch (err) {
      throw new Error(`Error get tasks by name!\n ${err}`);
    }
  }
}

export default TaskServices;
