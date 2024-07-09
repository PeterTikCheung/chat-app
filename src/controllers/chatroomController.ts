import { Request, Response } from 'express';
import ChatroomService from '@src/services/ChatroomService';
import { getSharedContext } from '@src/utils/ContextManager';
import UserService from '@src/services/UserService';
import {
  IIniChatroomRequest,
  IPostMessageRequest,
  IMarkReadRequest,
} from '@src/definitions/RequestDefinition';
import Logging from '@src/utils/logging';

const ChatroomController = {
  initiate: async (req: Request, res: Response): Promise<Response> => {
    try {
      const request = req as IIniChatroomRequest;
      const { userIds, type } = request.body;
      const chatInitiator: string = request.userId;
      const allUserIds = [...userIds, chatInitiator];
      const chatroom = await ChatroomService.initiateChat(
        allUserIds,
        type,
        chatInitiator,
      );
      return res.status(200).json({ success: true, chatroom });
    } catch (error) {
      Logging.error('Error on initiate controller method:' + error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  postMessage: async (req: Request, res: Response): Promise<Response> => {
    try {
      const request = req as IPostMessageRequest;
      const io = getSharedContext().io;
      const { roomId } = request.params;

      const messagePayload: any = {
        messageText: request.body.messageText,
      };
      const currentLoggedUser = request.userId; // Assuming you have middleware that sets req.userId
      const post = await ChatroomService.createPostInChatroom(
        roomId,
        messagePayload,
        currentLoggedUser,
      );
      // Emit a new message event to connected sockets in the chat room
      io.sockets.in(roomId).emit('new message', { message: post });

      return res.status(200).json({ success: true, post });
    } catch (error: any) {
      Logging.error('Error on postMessage controller method:' + error);
      return res.status(500).json({ success: false, error: error });
    }
  },
  getRecentConversation: async (req: Request, res: Response) => {
    // Your implementation here
  },
  getConversationByRoomId: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { roomId } = req.params;
      const room = await ChatroomService.getChatroomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        });
      }
      const users = await UserService.getUserByIds(room.userIds);
      const options = {
        page: parseInt(req.query.page as string) || 0,
        limit: parseInt(req.query.limit as string) || 10,
      };
      const conversation = await ChatroomService.getConversationByRoomId(
        roomId,
        options,
      );
      return res.status(200).json({
        success: true,
        conversation,
        users,
      });
    } catch (error: any) {
      Logging.error(
        'Error on getConversationByRoomId controller method:' + error,
      );
      return res.status(500).json({ success: false, error });
    }
  },
  markConversationReadByRoomId: async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const request = req as IMarkReadRequest;
      const { roomId } = request.params;
      const room = await ChatroomService.getChatroomByRoomId(roomId);
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        });
      }

      const currentLoggedUser = request.userId; // Assuming you have middleware that sets req.userId
      const result = await ChatroomService.markMessageRead(
        roomId,
        currentLoggedUser,
      );
      return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      Logging.error(
        'Error on markConversationReadByRoomId controller method:' + error,
      );
      return res.status(500).json({ success: false, error });
    }
  },
};

export default ChatroomController;