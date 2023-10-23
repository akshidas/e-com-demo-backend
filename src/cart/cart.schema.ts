import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, now } from 'mongoose';
import { Product } from 'src/products/products.schema';
import { User } from 'src/user/user.schema';

@Schema()
export class Cart {
  @Prop({ type: Types.ObjectId, ref: Product.name })
  product: Product;

  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ default: 1 })
  quantity: number;

  @Prop({ default: now() })
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
