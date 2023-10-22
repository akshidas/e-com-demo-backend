import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { RoleService } from 'src/roles/roles.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

const adminInfo: CreateUserDto = {
  email: 'admin@gmail.com',
  firstName: 'Admin',
  lastName: 'Ecom',
  mobile: '0123456789',
  password: 'root',
};

const sellerRole: CreateRoleDto = {
  name: 'seller',
  description: 'role for admin',
};
const adminRole: CreateRoleDto = {
  name: 'seller',
  description: 'role for admin',
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

  private async seedSellerRole() {
    try {
      await this.roleService.create(sellerRole);
      console.log('seeded seller role');
    } catch (err) {
      console.log(err.message);
    }
  }

  private async seedAdminRole() {
    try {
      await this.roleService.create(adminRole);
      console.log('seeded admin role');
    } catch (err) {
      console.log(err.message);
    }
  }

  async seedRole() {
    this.seedSellerRole();
    this.seedAdminRole();
  }
}
