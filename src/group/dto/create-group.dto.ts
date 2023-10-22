import { Types } from 'mongoose';

export class CreateGroupDto {
  user: Types.ObjectId;
  role: Types.ObjectId;
}
