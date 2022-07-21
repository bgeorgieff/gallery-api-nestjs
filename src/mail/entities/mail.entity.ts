import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MailDocument = Mail & Document;

@Schema()
export class Mail {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  paintingRef: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;
}

export const MailSchema = SchemaFactory.createForClass(Mail);
