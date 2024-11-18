import { Router } from "express";
import TaskController from "../controllers/taskController";

const router = Router();

export default (taskController: TaskController) => {
  router.get("/tasks", (req, res) => taskController.getAllTasks(req, res));
  return router;
};
