import express, { Request, Response } from 'express';
import userController from '@src/controllers/userController'; // Assuming you have a user controller

const router = express.Router();

router
  .get('/', userController.onGetAllUsers)
  .post('/', userController.onCreateUser)
  .get('/:id', userController.onGetUserById)
  .delete('/:id', userController.onDeleteUserById);

export default router;
