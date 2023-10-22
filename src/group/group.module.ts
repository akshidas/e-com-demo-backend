import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/roles/role.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { GroupRepo } from './group.repo';
import { Group, GroupSchema } from './group.schema';
import { GroupService } from './group.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Group.name, schema: GroupSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  providers: [GroupService, GroupRepo],
  exports: [GroupRepo, GroupService],
})
export class GroupModule {}
