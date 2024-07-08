import express, { Request, Response, NextFunction } from 'express';
import userController from '@src/controllers/UserController'; // Assuming you have a user controller

const router = express.Router();

router.post(
  '/login/:userId',
  (req: Request, res: Response, next: NextFunction) => {
    // Your login logic here
    // ...
  },
);

export default router;
