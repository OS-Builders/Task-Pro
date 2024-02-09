import express, { Request, Response } from "express";

const router = express.Router();

// import controllers
import boardsController from "../controllers/boardsController.ts";
import tasksController from "../controllers/tasksController.ts";

// define routes

// route for getting board names
router.get(
  "/myboards/:userId",
  boardsController.getMyBoards,
  boardsController.getBoardNamesAndIds,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.namesAndIds);
  }
);

router.get(
  "/board",
  boardsController.getCurrentBoard,
  tasksController.getTasks,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.board);
  }
);

router.post(
  "/create",
  boardsController.createBoard,
  boardsController.assignNewBoard,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.createdBoard); //may need the board just created data to render into the main container
  }
);

export default router;
