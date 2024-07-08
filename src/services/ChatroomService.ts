import User, { USER_TYPES } from '@src/models/User';
import Logging from '@src/utils/logging';
import Chatroom from '@src/models/Chatroom';
const ChatroomService = {
  async initiateChat(
    userIds: string[],
    type: string,
    chatInitiator: string,
  ): Promise<{
    isNew: boolean;
    message: string;
    chatroomId: string;
    type: string;
  }> {
    try {
      const availableRoom = await Chatroom.findOne({
        userIds: {
          $size: userIds.length,
          $all: [...userIds],
        },
        type,
      });

      if (availableRoom) {
        return {
          isNew: false,
          message: 'Retrieving an old chat room',
          chatroomId: availableRoom._id,
          type: availableRoom.type,
        };
      }
      const newRoom = await new Chatroom({
        userIds,
        type,
        chatInitiator,
      });
      await newRoom.save();

      return {
        isNew: true,
        message: 'Creating a new chatroom',
        chatroomId: newRoom._id,
        type: newRoom.type,
      };
    } catch (error) {
      console.error('Error on start chat method:', error);
      throw error;
    }
  },
};

export default ChatroomService;
