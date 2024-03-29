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

// route for getting all tasks associated with a board
router.get(
  "/board",
  boardsController.getCurrentBoard,
  tasksController.getTasks,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.board);
  }
);

// route for creating a new baord
router.post(
  "/create",
  boardsController.createBoard,
  boardsController.assignNewBoard,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.createdBoard); //may need the board just created data to render into the main container
  }
);

// route for deleting a boardd
router.delete(
  "/delete/:boardId",
  boardsController.getBoardFromId,
  tasksController.clearTask,
  boardsController.deleteBoard,
  boardsController.pullBoard,
  (_req: Request, res: Response) => {
    return res.status(200).json();
  }
);

// route for editing a board
router.put(
  "/edit",
  boardsController.editBoard,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.board);
  }
);

export default router;
