import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const USER_TYPES = {
  CONSUMER: 'consumer',
  SUPPORT: 'support',
};

interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
    },
    firstName: String,
    lastName: String,
    type: String,
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
