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
      res.locals.task = createdTask;

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
        updateQuery = { $push: { backlog: res.locals.task._id } };
      } else if (column === "inProgress") {
        updateQuery = {
          $push: { inProgress: res.locals.task._id },
        };
      } else if (column === "inReview") {
        updateQuery = {
          $push: { inReview: res.locals.task._id },
        };
      } else {
        updateQuery = {
          $push: { completed: res.locals.task._id },
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
      const editedTask = await Card.findByIdAndUpdate(
        taskEdits.taskId,
        {
          name: taskEdits.taskname,
          status: taskEdits.status,
          notes: taskEdits.tasknotes,
        },
        { new: true }
      );
      res.locals.task = editedTask;

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
  pullTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const column = req.body.startColumn;
      let updateQuery;
      if (column === "backlog") {
        updateQuery = { $pull: { backlog: res.locals.task._id } };
      } else if (column === "inProgress") {
        updateQuery = {
          $pull: { inProgress: res.locals.task._id },
        };
      } else if (column === "inReview") {
        updateQuery = {
          $pull: { inReview: res.locals.task._id },
        };
      } else {
        updateQuery = {
          $pull: { completed: res.locals.task._id },
        };
      }
      await Board.updateOne({ _id: req.body.boardId }, updateQuery);
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `tasksController.pullTask ERROR: ${err}`,
        status: 500,
        message: { err: "Error pulling Task" },
      });
    }
  },
  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedTask = await Card.findOneAndDelete({
        _id: req.params.taskId,
      });
      res.locals.task = deletedTask;
      return next();
    } catch (err) {
      // pass error through to global error handler
      return next({
        log: `tasksController.deleteTask ERROR: ${err}`,
        status: 500,
        message: { err: "Error deleting Task" },
      });
    }
  },
};

export default tasksController;
