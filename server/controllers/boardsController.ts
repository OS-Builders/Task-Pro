import User from "../models/userModel.ts";
import { NextFunction, Request, Response } from "express";

const boardsController = {
  getMyBoards: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // find all boards beloning to the user, push board names into an array and save on locals
      console.log("req.params.userId: ", req.params.userId);
      const user = await User.findOne({ _id: req.params.userId });
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
};

export default boardsController;
