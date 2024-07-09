import express from 'express';
import userController from '@src/controllers/UserController'; // Assuming you have a user controller

const router = express.Router();

router
  .get('/', userController.onGetAllUsers)
  .post('/', userController.onCreateUser)
  .get('/:id', userController.onGetUserById);

export default router;
