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
      res.locals.user = { id: user._id, name: user.username };
      return next();
    } catch (err) {
      // send any errors to global error handler
      return next({
        log: `userController.createUser ERROR: ${err}`,
        status: 500,
        message: { err: "Error occured creating user" },
      });
    }
  },

  // middleware for verifying a user on login
  verifyUser: async (req: Request, res: Response, next: NextFunction) => {
    // obtain user name password from request body
    const { username, password } = req.body;
    // check for a missing input
    if (!username || !password) {
      return next({
        log: "Missing username or password in verifyUser",
        status: 400,
        message: { err: "Username and Password required" },
      });
    }
    try {
      // search DB for the user based on the username
      const user = await User.findOne({ username });
      // if now user is found error out
      if (!user) {
        return next({
          log: `userController.verifyUser ERROR: no user with input username found in DB`,
          status: 400,
          message: { err: "Invalid username or password" },
        });
      } else {
        // else a user is found, check passwords
        const resultPassword = await bcrypt.compare(password, user.password);
        // if passwords do not match error out
        if (!resultPassword) {
          return next({
            log: `userController.verifyUser ERROR: input password does not match stored password`,
            status: 400,
            message: { err: "Invalid username or password" },
          });
        }
        // passwords do match, store username in res.locals to send back to frontend
        res.locals.user = { id: user._id, name: user.username };
        return next();
      }
    } catch (err) {
      // send any errors to global error handler
      return next({
        log: `usersController.createUser ERROR: ${err}`,
        status: 500,
        message: { err: "Error occured creating user" },
      });
    }
  },
};

export default userController;
