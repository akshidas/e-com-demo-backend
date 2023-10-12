import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ unique: true })
  slug: string;

  @Prop({ default: now() })
  created_at?: Date;

  @Prop()
  updated_at?: Date;

  @Prop({ default: null })
  deleted_at?: Date;
}

export type CustomerDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('save', async function (next) {
  const category = this;
  const { slug, name } = category;
  if (!slug) {
    category.slug = name.toLowerCase().replaceAll(' ', '-');
  }
  next();
});
