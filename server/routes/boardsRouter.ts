import express, { Request, Response } from "express";

const router = express.Router();

// import controllers
import boardsController from "../controllers/boardsController.ts";

// define routes

// route for getting board names
router.get(
  "/:userId",
  boardsController.getBoardNames,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.boardNames);
  }
);

export default router;
