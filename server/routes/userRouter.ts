import express, { Request, Response } from "express";

const router = express.Router();

// import controllers
import userController from "../controllers/userController.ts";

// define routes

// route for signup
router.post(
  "/signup",
  userController.createUser,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.username);
  }
);

// route for login
router.post(
  "/login",
  userController.verifyUser,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.username);
  }
);

export default router;
