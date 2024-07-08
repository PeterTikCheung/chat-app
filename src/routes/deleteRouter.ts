import express from 'express';
// controllers
import deleteController from '@src/controllers/deleteController';

const router = express.Router();

router
  .delete('/room/:roomId', deleteController.deleteRoomById)
  .delete('/message/:messageId', deleteController.deleteMessageById);

export default router;
