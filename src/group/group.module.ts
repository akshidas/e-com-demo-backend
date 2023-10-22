import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupRepo } from './group.repo';

@Module({
  providers: [GroupService, GroupRepo],
})
export class GroupModule {}
