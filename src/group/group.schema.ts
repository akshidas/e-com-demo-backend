import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, now } from 'mongoose';
import { Role } from 'src/roles/role.schema';
import { User } from 'src/user/user.schema';

@Schema()
export class Group {
  @Prop({ type: Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: Types.ObjectId, ref: Role.name })
  role: Role;

  @Prop({ default: now() })
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  deleted_at: Date;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
