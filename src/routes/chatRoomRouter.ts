import express from 'express';
// controllers
import ChatroomController from '@src/controllers/ChatroomController';

const router = express.Router();

router
  .get('/', ChatroomController.getRecentConversation)
  .get('/:roomId', ChatroomController.getConversationByRoomId)
  .post('/initiate', ChatroomController.initiate)
  .post('/:roomId/message', ChatroomController.postMessage)
  .put('/:roomId/mark-read', ChatroomController.markConversationReadByRoomId);

export default router;
