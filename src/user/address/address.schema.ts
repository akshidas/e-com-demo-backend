import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as M_Schema, now } from 'mongoose';
import { User } from '../entity/user.entity';

@Schema()
export class Address {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  pincode: string;

  @Prop({ default: now() })
  created_at?: Date;

  @Prop()
  updated_at?: Date;

  @Prop({ type: M_Schema.Types.ObjectId, ref: User.name })
  user?: User;
}
export type AddressDocument = HydratedDocument<Address>;
export const AddressSchema = SchemaFactory.createForClass(Address);
