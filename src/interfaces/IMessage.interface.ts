import { Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  paintigRef: string;
  email: string;
  message: string;
}
