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

      if (!tasks || tasks.length === 0) {
        res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json(tasks);
    } catch (error) {
      this.logger.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  async getActiveTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks: Task[] = await this._taskService.getAtivedTasks();

      if (!tasks || tasks.length === 0) {
        res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json(tasks);
    } catch (error) {
      this.logger.error('Error fetching active tasks:', error);
      res.status(500).json({ error: 'Failed to fetch active tasks' });
    }
  }

  async getFinishedTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks: Task[] = await this._taskService.getFinishedTasks();

      if (!tasks || tasks.length === 0) {
        res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json(tasks);
    } catch (error) {
      this.logger.error('Error fetching finished tasks:', error);
      res.status(500).json({ error: 'Failed to fetch finished tasks' });
    }
  }

  async getTasksByName(req: Request, res: Response): Promise<void> {
    const { task_name } = req.query;

    if (!task_name || typeof task_name !== 'string') {
      res.status(400).json({
        error: 'Parameter "task_name" is required and must be a string',
      });
      return;
    }

    try {
      const tasks: Task[] = await this._taskService.getTaskByName(task_name);

      if (tasks.length === 0) {
        res.status(404).json({ message: 'No tasks found with the given name' });
      } else {
        res.status(200).json(tasks);
      }
    } catch (error) {
      this.logger.error('Error fetching tasks by name:', { task_name, error });

      res.status(500).json({ error: 'Failed to fetch tasks by name' });
    }
  }
}

export default TaskController;
