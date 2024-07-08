import mongoose, { Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const CHAT_ROOM_TYPES = {
  CONSUMER_TO_CONSUMER: 'consumer-to-consumer',
  CONSUMER_TO_SUPPORT: 'consumer-to-support',
};

interface IChatRoom extends Document {
  userIds: string[];
  type: string;
  chatInitiator: string;
}

const chatRoomSchema = new mongoose.Schema<IChatRoom>(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
    },
    userIds: [String],
    type: String,
    chatInitiator: String,
  },
  {
    timestamps: true,
    collection: 'chatrooms',
  },
);

export default mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);
