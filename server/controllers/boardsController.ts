import User from "../models/userModel.ts";
import Board from "../models/boardModel.ts";
import { NextFunction, Request, Response } from "express";
import { BoardListItemState } from "../../src/types.ts";

const boardsController = {
  getMyBoards: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // find all boards beloning to the user, push board names into an array and save on locals
      console.log("req.params.userId: ", req.params.userId);
      const user = await User.findOne({ _id: req.params.userId }).populate(
        "boards"
      );
      if (!user) {
        return next({
          log: `boardsController.getMyBoards ERROR: User cannot be found.`,
          status: 500,
          message: { err: "Cannot find user." },
        });
      }
      res.locals.boards = user.boards;
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `boardssController.getMyBoards ERROR: ${err}`,
        status: 500,
        message: { err: "Error getting my boards" },
      });
    }
  },
  getBoardNamesAndIds: async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("res.locals.boards: ", res.locals.boards);
      const namesAndIds: BoardListItemState[] = [];
      res.locals.boards.forEach((board: any) => {
        console.log("board.name: ", board.name);
        namesAndIds.push({
          name: board.name,
          id: board._id,
        });
      });
      res.locals.namesAndIds = namesAndIds;
      console.log("res.locals.namesAndIds: ", res.locals.namesAndIds);
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `boardssController.getBoardNamesAndIds ERROR: ${err}`,
        status: 500,
        message: { err: "Error refining boards down to names and ids" },
      });
    }
  },
  createBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdBoard = await Board.create({
        name: req.body.boardName,
        backlog: [],
        inProgress: [],
        inReview: [],
        completed: [],
        boardOwner: req.body.userId,
      });
      res.locals.createdBoard = createdBoard;
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `boardssController.createBoard ERROR: ${err}`,
        status: 500,
        message: { err: "Error creating new board" },
      });
    }
  },
  assignNewBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await User.updateOne(
        { _id: req.body.userId },
        { $push: { boards: res.locals.createdBoard._id } }
      );
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `boardssController.assignNewBoard ERROR: ${err}`,
        status: 500,
        message: { err: "Error assigning board to user" },
      });
    }
  },
  getCurrentBoard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // obtain the user document
      const user = await User.findOne({ _id: req.query.user }).populate(
        "boards"
      );
      if (!user) {
        return next({
          log: `boardsController.getCurrentBoard ERROR: User cannot be found.`,
          status: 500,
          message: { err: "Cannot find board." },
        });
      }
      // Find the board by ID
      const board = user.boards.find(
        (boardObj) => boardObj._id.toString() === req.query.board
      );
      if (!board) {
        return next({
          log: `boardsController.getCurrentBoard ERROR: Board cannot be found.`,
          status: 500,
          message: { err: "Cannot find board." },
        });
      }
      console.log("board: ", board);
      res.locals.board = board;
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `boardssController.getCurrentBoard ERROR: ${err}`,
        status: 500,
        message: { err: "Error getting current board" },
      });
    }
  },
};

export default boardsController;
