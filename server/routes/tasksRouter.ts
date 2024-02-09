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
    return res.status(200).json(res.locals.createdTask);
  }
);

// route for editing a task card
router.post(
  "/edit",
  tasksController.editTask,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.editedTask);
  }
);

export default router;
