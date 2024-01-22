import express, { Request, Response } from 'express';

const router = express.Router();

// import controllers
import boardsController from '../controllers/boardsController.ts';

// define routes

// route for getting board names
router.get(
  '/:userId',
  boardsController.getMyBoards,
  boardsController.getBoardNamesAndIds,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.namesAndIds);
  }
);

router.get(
  '/:boardID',
  boardsController.getCurrentBoard,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.boardInfo);
  }
);

router.post(
  '/create',
  boardsController.createBoard,
  boardsController.assignNewBoard,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.createdBoard); //may need the board just created data to render into the main container
  }
);

export default router;
