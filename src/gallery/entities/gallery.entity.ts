import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GalleryDocument = Gallery & Document;

@Schema()
export class Gallery {
  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  imageAltTxt: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dateCreated: Date;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  uniqueId: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  isFeatured: boolean;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
