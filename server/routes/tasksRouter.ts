import express, { Request, Response } from "express";

const router = express.Router();

// import controllers
import tasksController from "../controllers/tasksController.ts";

// define routes

// route for adding a new task card
router.post(
  "/create",
  //   (_req: Request, _res: Response, next: NextFunction) => {
  //     console.log("in /tasks/create");
  //     return next();
  //   },
  tasksController.createTask,
  tasksController.assignTask,
  (_req: Request, res: Response) => {
    return res.status(200).json({});
  }
);

export default router;
