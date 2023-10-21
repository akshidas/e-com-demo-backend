import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import EntityNotFound from 'src/shared/utils/errors/entity-not-found.error';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.schema';

@Injectable()
export class RolesRepo {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = new this.roleModel(createRoleDto);
    return role.save();
  }

  async getAll() {
    const roles = await this.roleModel.find({ deleted_at: null });
    return roles;
  }

  async getOne(id: string) {
    const role = await this.roleModel.findById(id);
    if (role) return role;

    throw new EntityNotFound(`role with value ${id} does not exist`);
  }

  async updateOne(id: string, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.roleModel.findByIdAndUpdate(
      id,
      updateRoleDto,
      { returnOriginal: false },
    );

    return updatedRole;
  }
}
