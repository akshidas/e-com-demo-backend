import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema()
export class Auth {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user_id: Types.ObjectId;

  @Prop()
  loggedInTime?: Date[];
}

export type AuthDocument = HydratedDocument<Auth>;
export const AuthSchema = SchemaFactory.createForClass(Auth);
