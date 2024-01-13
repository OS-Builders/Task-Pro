import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.ts';

// start the DB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) throw new Error('MONGO_URI environment variable undefinded');
mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Error connecting to DB: ', err));

// ES Modules work around
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// serve static files
app.use(express.static(join(__dirname, '../dist')));

// route handlers
app.use('/user', userRouter);

// serve the built index.html
app.use('/', (_req: Request, res: Response) => {
  return res.sendFile(join(__dirname, '../dist/index.html'));
});

// unknown route handling
app.use('*', (_req: Request, res: Response) => {
  return res.status(404).send('Page not found');
});

// global error handling
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    //make sure to make type for default for global error handling
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
