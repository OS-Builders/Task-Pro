import Board from "../models/boardModel.ts";
import Card from "../models/cardModel.ts";
import { NextFunction, Request, Response } from "express";

const tasksController = {
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdTask = await Card.create({
        name: req.body.taskname,
        status: req.body.status,
        notes: req.body.tasknotes,
      });
      res.locals.createdTask = createdTask;

      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `tasksController.createTask ERROR: ${err}`,
        status: 500,
        message: { err: "Error creating Task" },
      });
    }
  },
  assignTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const column = req.body.status;
      let updateQuery;
      if (column === "backlog") {
        updateQuery = { $push: { backlog: res.locals.createdTask._id } };
      } else if (column === "inProgress") {
        updateQuery = {
          $push: { inProgress: res.locals.createdTask._id },
        };
      } else if (column === "inReview") {
        updateQuery = {
          $push: { inReview: res.locals.createdTask._id },
        };
      } else {
        updateQuery = {
          $push: { completed: res.locals.createdTask._id },
        };
      }
      await Board.updateOne({ _id: req.body.boardId }, updateQuery);
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `tasksController.assignTask ERROR: ${err}`,
        status: 500,
        message: { err: "Error assigning task into board" },
      });
    }
  },
  getTasks: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      // populate the tasks
      res.locals.board = await res.locals.board.populate("backlog");
      res.locals.board = await res.locals.board.populate("inProgress");
      res.locals.board = await res.locals.board.populate("inReview");
      res.locals.board = await res.locals.board.populate("completed");
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `tasksController.getTasks ERROR: ${err}`,
        status: 500,
        message: { err: "Error getting Tasks" },
      });
    }
  },
  editTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskEdits = req.body;
      const editedTask = await Card.findByIdAndUpdate({
        name: taskEdits.taskname,
        status: taskEdits.status,
        notes: taskEdits.tasknotes,
      });
      res.locals.editedTask = editedTask;

      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `tasksController.editTask ERROR: ${err}`,
        status: 500,
        message: { err: "Error editing Task" },
      });
    }
  },
};

export default tasksController;
