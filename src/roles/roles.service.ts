import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepo } from './role.repo';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepo: RolesRepo) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepo.create(createRoleDto);
  }

  async getAll() {
    return this.roleRepo.getAll();
  }

  async getOne(id: string) {
    return this.roleRepo.getOne(id);
  }

  async updateOne(id: string, updateRoleDto: UpdateRoleDto) {
    return this.roleRepo.updateOne(id, updateRoleDto);
  }
}
