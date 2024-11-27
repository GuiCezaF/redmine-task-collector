import { Router } from 'express';
import TaskController from '../controllers/taskController';

const router = Router();

export default (taskController: TaskController) => {
  router.get('/sync', (req, res) => taskController.syncronizeTask(req, res));
  router.get('/tasks', (req, res) => taskController.getAllTasks(req, res));
  router.get('/active-tasks', (req, res) =>
    taskController.getActiveTasks(req, res),
  );
  router.get('/finished-tasks', (req, res) =>
    taskController.getFinishedTasks(req, res),
  );
  router.get('/task', (req, res) => taskController.getTasksByName(req, res));
  return router;
};
