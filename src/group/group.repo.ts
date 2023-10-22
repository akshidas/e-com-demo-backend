import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './group.schema';

@Injectable()
export class GroupRepo {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = new this.groupModel(createGroupDto);
    return await group.save();
  }

  async alreadyAssignedGroup(uid: Types.ObjectId, rid: Types.ObjectId) {
    const alreadyAssignedTheGroup = await this.groupModel.exists({
      user: uid,
      role: rid,
    });
    return Boolean(alreadyAssignedTheGroup);
  }
}
