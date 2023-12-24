import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, now } from 'mongoose';
import { Category } from 'src/category/category.schema';
import { Image } from 'src/images/image.schema';

@Schema({ toJSON: { virtuals: true }, id: false })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  sku: string;
  @Prop({ required: true })
  description: string;
  @Prop({ default: true })
  status?: boolean;

  @Prop({ default: true })
  price: number;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category_id: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: Image.name })
  images: Image[];

  @Prop({ default: now() })
  created_at?: Date;

  @Prop()
  updated_at?: Date;

  @Prop({ default: null })
  deleted_at?: Date;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('category', {
  ref: Category.name,
  localField: 'category_id',
  foreignField: '_id',
  justOne: true,
});
