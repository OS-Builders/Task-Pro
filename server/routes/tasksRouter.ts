import express, { Request, Response } from "express";

const router = express.Router();

// import controllers
import tasksController from "../controllers/tasksController.ts";

// define routes

// route for adding a new task card
router.post(
  "/create",
  tasksController.createTask,
  tasksController.assignTask,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.task);
  }
);

// route for editing a task card
router.post(
  "/edit",
  tasksController.editTask,
  tasksController.pullTask,
  tasksController.assignTask,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.task);
  }
);

// route for deleting a task card
router.delete(
  "/delete/:taskId",
  tasksController.deleteTask,
  tasksController.pullTask,
  (_req: Request, res: Response) => {
    return res.status(200).json();
  }
);

export default router;
