import { Document } from 'mongoose';

export interface IGallery extends Document {
  imageUrl: string;
  imageAltTxt: string;
  name: string;
  dateCreated: Date;
  size: string;
  uniqueId: string;
  description: string;
  isFeatured: boolean;
}
