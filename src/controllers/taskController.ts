import 'reflect-metadata';
import { Request, Response } from 'express';
import RedmineService from '../services/redmineService';
import TaskServices from '../services/taskServices';
import { Task } from '../entities/Task';
import Logger from '../utils/logger';

class TaskController {
  constructor(
    private _redmineService: RedmineService,
    private _taskService: TaskServices,
  ) {}

  private logger = new Logger();

  async syncronizeTask(req: Request, res: Response): Promise<void> {
    try {
      await this._redmineService.syncTasks();
      res.status(200).json({ message: 'Tasks synchronized successfully' });
    } catch (err) {
      throw new Error(`Failed to sync tasks: ${err}`);
    }
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks: Task[] = await this._taskService.getAllTasks();

      res.status(200).json(tasks);
    } catch (error) {
      this.logger.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  async getActiveTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks: Task[] = await this._taskService.getAtivedTasks();

      res.status(200).json(tasks);
    } catch (error) {
      this.logger.error('Error fetching active tasks:', error);
      res.status(500).json({ error: 'Failed to fetch active tasks' });
    }
  }
}

export default TaskController;
