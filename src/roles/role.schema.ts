import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';
import { Roles } from './types/role.type';

@Schema()
export class Role {
  @Prop({ required: true, unique: true })
  name: Roles;

  @Prop({ required: true })
  description: string;

  @Prop({ default: now() })
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop({ default: null })
  deleted_at: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export type RoleDocument = HydratedDocument<Role>;
