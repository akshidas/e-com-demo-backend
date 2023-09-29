import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Customer } from 'src/customer/customer.schema';

@Schema()
export class Auth {
  @Prop({ type: Types.ObjectId, ref: Customer.name })
  user_id: Types.ObjectId;

  @Prop()
  loggedInTime?: Date[];
}

export type AuthDocument = HydratedDocument<Auth>;
export const AuthSchema = SchemaFactory.createForClass(Auth);
