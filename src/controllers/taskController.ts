import 'reflect-metadata';
import { Request, Response } from "express";
import RedmineService from "../services/redmineService";
import TaskServices from "../services/taskServices";
import { Task } from "../entities/Task";

class TaskController {
  constructor(private _redmineService: RedmineService, private _taskService: TaskServices) {}

  public async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks: Task[] = await this._taskService.getAllTasks();

      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  }
}

export default TaskController;
