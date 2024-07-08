import { Request, Response } from 'express';
import ChatroomService from '@src/services/ChatroomService';
export default {
  initiate: async (req: Request, res: Response) => {
    try {
      const { userIds, type } = req.body;
      const chatInitiator: string = req.body.userId;
      const allUserIds = [...userIds, chatInitiator];
      const chatroom = await ChatroomService.initiateChat(
        allUserIds,
        type,
        chatInitiator,
      );
      res.status(200).json({ success: true, chatroom });
    } catch (error) {
      console.error('Error on initiate method:', error);
      res.status(500).json({ success: false, error });
    }
  },
  postMessage: async (req: Request, res: Response) => {
    // Your implementation here
  },
  getRecentConversation: async (req: Request, res: Response) => {
    // Your implementation here
  },
  getConversationByRoomId: async (req: Request, res: Response) => {
    // Your implementation here
  },
  markConversationReadByRoomId: async (req: Request, res: Response) => {
    // Your implementation here
  },
};
