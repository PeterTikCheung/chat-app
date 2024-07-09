import Chatroom from '@src/models/Chatroom';
import ChatMessage from '@src/models/ChatMessage';
import Logging from '@src/utils/logging';
const ChatroomService = {
  initiateChat: async (
    userIds: string[],
    type: string,
    chatInitiator: string,
  ): Promise<{
    isNew: boolean;
    message: string;
    chatroomId: string;
    type: string;
  }> => {
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
      const newRoom = new Chatroom({
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
      Logging.error('Error on initiateChat service method:' + error);
      throw error;
    }
  },

  //this function creates a new chat message, saves it to the database, and retrieves aggregated information about the chat room and related users.
  createPostInChatroom: async (
    chatroomId: string,
    message: string,
    postedByUser: string,
  ): Promise<any> => {
    try {
      const post = new ChatMessage({
        chatroomId,
        message,
        postedByUser,
        readByRecipients: [{ readByUserId: postedByUser }],
      });
      post.save();

      const aggregate = await ChatMessage.aggregate([
        // get post where _id = post._id
        { $match: { _id: post._id } },
        // do a join on another table called users, and
        // get me a user whose _id = postedByUser
        {
          $lookup: {
            from: 'users',
            localField: 'postedByUser',
            foreignField: '_id',
            as: 'postedByUser',
          },
        },
        { $unwind: '$postedByUser' },
        // do a join on another table called chatrooms, and
        // get me a chatroom whose _id = chatRoomId
        {
          $lookup: {
            from: 'chatrooms',
            localField: 'chatroomId',
            foreignField: '_id',
            as: 'chatroomInfo',
          },
        },
        { $unwind: '$chatRoomInfo' },
        { $unwind: '$chatRoomInfo.userIds' },
        // do a join on another table called users, and
        // get me a user whose _id = userIds
        {
          $lookup: {
            from: 'users',
            localField: 'chatroomInfo.userIds',
            foreignField: '_id',
            as: 'chatroomInfo.userProfile',
          },
        },
        { $unwind: '$chatroomInfo.userProfile' },
        // group data
        {
          $group: {
            _id: '$chatRoomInfo._id',
            postId: { $last: '$_id' },
            chatRoomId: { $last: '$chatRoomInfo._id' },
            message: { $last: '$message' },
            type: { $last: '$type' },
            postedByUser: { $last: '$postedByUser' },
            readByRecipients: { $last: '$readByRecipients' },
            chatRoomInfo: { $addToSet: '$chatRoomInfo.userProfile' },
            createdAt: { $last: '$createdAt' },
            updatedAt: { $last: '$updatedAt' },
          },
        },
      ]);

      return aggregate[0]; // Adjust this based on your actual result
    } catch (error) {
      Logging.error('Error on createPostInChatroom service method:' + error);
      throw error;
    }
  },
  getChatroomByRoomId: async (roomId: string): Promise<any> => {
    try {
      const room = await Chatroom.findOne({ _id: roomId });
      return room;
    } catch (error) {
      Logging.error('Error on getChatroomByRoomId service method:' + error);
      throw error;
    }
  },
  //The function returns an aggregated result, which is a list of chat messages along with user information.
  getConversationByRoomId: async (
    chatroomId: string,
    options: { page?: number; limit?: number } = {},
  ): Promise<any> => {
    try {
      return ChatMessage.aggregate([
        // Filters chat messages based on the specified chatRoomId.
        { $match: { chatroomId } },
        //Sorts chat messages by their createdAt timestamp in descending order.
        { $sort: { createdAt: -1 } },
        // do a join on another table called users, and
        // get me a user whose _id = postedByUser
        {
          $lookup: {
            from: 'users',
            localField: 'postedByUser',
            foreignField: '_id',
            as: 'postedByUser',
          },
        },
        //Deconstructs the postedByUser array to create separate documents for each user.
        { $unwind: '$postedByUser' },
        // apply pagination
        { $skip: options.page || 0 },
        { $limit: options.limit || 10 },
        { $sort: { createdAt: 1 } },
      ]);
    } catch (error) {
      Logging.error('Error on getConversationByRoomId service method:' + error);
      throw error;
    }
  },
  markMessageRead: async (
    chatroomId: string,
    currentUserOnlineId: string,
  ): Promise<any> => {
    try {
      return ChatMessage.updateMany(
        {
          chatroomId,
          // ensures that the readByRecipients.readByUserId field does not contain the currentUserOnlineId.
          'readByRecipients.readByUserId': { $ne: currentUserOnlineId },
        },
        {
          $addToSet: {
            readByRecipients: { readByUserId: currentUserOnlineId },
          },
        },
        {
          multi: true,
        },
      );
    } catch (error) {
      Logging.error('Error on markMessageRead service method:' + error);
      throw error;
    }
  },
};

export default ChatroomService;
