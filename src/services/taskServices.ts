import 'reflect-metadata';
import { Repository } from "typeorm";
import { Task } from "../entities/Task";
import Logger from "../utils/logger";


class TaskServices {
  private logger = new Logger();
  private taskRepository: Repository<Task>;

  constructor(taskRepository: Repository<Task>) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks(): Promise<Task[]> {
    try {

      const tasks = await this.taskRepository.find();
      this.logger.success("Tasks retrieved sucessfully");

      return tasks;
    } catch (err) {
      throw new Error(`Error get all tasks!\n ${err}`);
    }
  }
}

export default TaskServices;
