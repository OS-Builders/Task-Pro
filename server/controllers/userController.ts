import User from "../models/userModel.ts";
import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

const userController = {
  // middleware for creating a new user on signup
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    // obtain username, password and email from the request body
    const { username, email, password } = req.body;
    try {
      // check if any input is missing
      if (!username || !password || !email) {
        return next({
          log: "userController.createUser error, missing input",
          status: 400,
          message: { err: "Missing an input!" },
        });
      }
      //generate salt and encrypt with bcrypt function
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // create the user in the DB
      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      // store the username on res.locals to send back to frontend
      res.locals.username = user.username;
      return next();
    } catch (err) {
      return next({
        log: `usersController.createUser ERROR: ${err}`,
        status: 500,
        message: { err: "Error occured creating user" },
      });
    }
  },

  // middleware for verifying a user on login
  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return next({
        log: "Missing username or password in verifyUser",
        status: 400,
        message: { err: "Username and Password required" },
      });
    }
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return next({
          log: "User does not exist",
          status: 400,
          message: { err: "Invalid username or password" },
        });
      } else {
        const resultPassword = await bcrypt.compare(password, user.password);
        if (!resultPassword) {
          return next({
            log: "User does not exist",
            status: 400,
            message: { err: "Invalid username or password" },
          });
        }
        res.locals.username = username;
        return next();
      }
    } catch (err) {
      return next();
    }
  },
};

export default userController;
