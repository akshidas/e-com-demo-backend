import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from 'src/roles/role.module';
import { Role, RoleSchema } from 'src/roles/role.schema';
import { User, UserSchema } from 'src/user/entity/user.entity';
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
    RoleModule,
  ],
  providers: [GroupService, GroupRepo],
  exports: [GroupRepo, GroupService],
})
export class GroupModule {}
