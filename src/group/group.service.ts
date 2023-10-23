import { Injectable } from '@nestjs/common';
import { RoleDocument } from 'src/roles/role.schema';
import { RoleService } from 'src/roles/roles.service';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import { UserDocument } from 'src/user/user.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupRepo } from './group.repo';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepo: GroupRepo,
    private readonly roleService: RoleService,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.groupRepo.create(createGroupDto);
  }

  async alreadyAssignedGroup(user: UserDocument, role: RoleDocument) {
    const alreadyAssignedTheGroup = await this.groupRepo.alreadyAssignedGroup(
      user.id,
      role.id,
    );
    if (alreadyAssignedTheGroup) {
      throw new DuplicateKeyError(
        `${user.firstName} has role ${role.name} already assigned`,
      );
    }
  }

  async isAdmin(uid: string) {
    const { id: rid } = await this.roleService.getAdmin();
    return await this.groupRepo.isAdmin(uid, rid);
  }
}
