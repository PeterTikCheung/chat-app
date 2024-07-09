import { Request } from 'express';
export interface IIniChatroomRequest extends Request {
  userId: string;
}

export interface IPostMessageRequest extends Request {
  userId: string;
}
export interface IMarkReadRequest extends Request {
  userId: string;
}
