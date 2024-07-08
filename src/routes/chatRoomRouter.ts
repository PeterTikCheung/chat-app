import express from 'express';
// controllers
import chatroomController from '@src/controllers/ChatroomController';

const router = express.Router();

router
  .get('/', chatroomController.getRecentConversation)
  .get('/:roomId', chatroomController.getConversationByRoomId)
  .post('/initiate', chatroomController.initiate)
  .post('/:roomId/message', chatroomController.postMessage)
  .put('/:roomId/mark-read', chatroomController.markConversationReadByRoomId);

export default router;
