import express from 'express';
// controllers
import ChatroomController from '@src/controllers/ChatroomController';
import { authenticateToken } from '@src/middlewares/auth/jwt';

const router = express.Router();

router
  .get('/', ChatroomController.getRecentConversation)
  .get('/:roomId', ChatroomController.getConversationByRoomId)
  .post('/initiate', authenticateToken, ChatroomController.initiate)
  .post('/:roomId/message', authenticateToken, ChatroomController.postMessage)
  .put(
    '/:roomId/mark-read',
    authenticateToken,
    ChatroomController.markConversationReadByRoomId,
  );

export default router;
