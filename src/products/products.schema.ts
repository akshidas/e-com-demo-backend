import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, now } from 'mongoose';
import { Category } from 'src/category/category.schema';

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  sku: string;

  @Prop({ default: true })
  status?: boolean;

  @Prop({ default: true })
  price: number;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category_id: Types.ObjectId;

  @Prop({ default: now() })
  created_at?: Date;

  @Prop()
  updated_at?: Date;

  @Prop({ default: null })
  deleted_at?: Date;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
