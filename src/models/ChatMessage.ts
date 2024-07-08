import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

enum MESSAGE_TYPES {
  TYPE_TEXT = 'text',
}

interface ReadByRecipient {
  _id: boolean;
  readByUserId: string;
  readAt: Date;
}

interface ChatMessage extends Document {
  _id: string;
  chatRoomId: string;
  message: Record<string, any>; // You can specify a more specific type for the message if needed
  type: string;
  postedByUser: string;
  readByRecipients: ReadByRecipient[];
}

const readByRecipientSchema: Schema = new mongoose.Schema<ReadByRecipient>(
  {
    _id: false,
    readByUserId: String,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  },
);

const chatMessageSchema: Schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
    },
    chatRoomId: String,
    message: mongoose.Schema.Types.Mixed,
    type: {
      type: String,
      default: MESSAGE_TYPES.TYPE_TEXT,
    },
    postedByUser: String,
    readByRecipients: [readByRecipientSchema],
  },
  {
    timestamps: true,
    collection: 'chatmessages',
  },
);

export default mongoose.model<ChatMessage>('ChatMessage', chatMessageSchema);
