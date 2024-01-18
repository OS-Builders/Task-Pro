import Board from "../models/boardModel.ts";
import { NextFunction, Request, Response } from "express";

const boardsController = {
  getBoardNames: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // project to only include name from DB
      const projection = {
        name: 1,
        backlog: 0,
        inProgress: 0,
        inReview: 0,
        completed: 0,
        boardOwner: 0,
        _id: 0,
      };
      // find all boards beloning to the user, push board names into an array and save on locals
      const results = await Board.find(
        { boardOwner: req.params.user },
        projection
      );
      const boardNames: string[] = [];
      results.forEach((result) => {
        boardNames.push(result.name);
      });
      res.locals.boardNames = boardNames;
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `boardssController.getBoardNames ERROR: ${err}`,
        status: 500,
        message: { err: "Error getting board names" },
      });
    }
  },
};

export default boardsController;
