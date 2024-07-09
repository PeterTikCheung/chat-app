import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const CHATROOM_TYPES = {
  CONSUMER_TO_CONSUMER: 'consumer-to-consumer',
  CONSUMER_TO_SUPPORT: 'consumer-to-support',
};

interface IChatroom extends Document {
  _id: string;
  userIds: string[];
  type: string;
  chatInitiator: string;
}

const chatroomSchema = new mongoose.Schema<IChatroom>(
  {
    _id: {
      type: String,
      default: ():string => uuidv4().replace(/-/g, ''),
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

export default mongoose.model<IChatroom>('Chatroom', chatroomSchema);
