import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

@Schema()
export class Image {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  size: number;

  @Prop({ default: now() })
  created_at?: Date;

  @Prop()
  updated_at?: Date;

  @Prop({ default: null })
  deleted_at?: Date;
}

export type ImageDocument = HydratedDocument<Image>;
export const ImageSchema = SchemaFactory.createForClass(Image);
