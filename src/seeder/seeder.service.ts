import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { RoleService } from 'src/roles/roles.service';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import _users from './data/_user.json';

const adminInfo: CreateUserDto = {
  email: 'admin@gmail.com',
  firstName: 'Admin',
  lastName: 'Ecom',
  mobile: '0123456789',
  password: 'root',
};

@Injectable()
export class SeederService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}
  async seedUser() {
    try {
      await this.userService.create(adminInfo);
      console.log('seeded admin user');
    } catch (err) {
      console.log(err.message);
    }
  }

  async seedRole(role: CreateRoleDto, message: string) {
    try {
      await this.roleService.create(role);
      console.log(message);
    } catch (err) {
      if (err instanceof DuplicateKeyError) {
        console.log('already seeded');
      }
      console.log(err.message);
    }
  }
}
