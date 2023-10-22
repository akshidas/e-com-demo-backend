import { Injectable } from '@nestjs/common';
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
  constructor(private readonly userService: UserService) {}
  async seedUser() {
    try {
      await this.userService.create(adminInfo);
      console.log('finished seeding admin');
      
    } catch (err) {
      if (err instanceof DuplicateKeyError) {
        console.log('already seeded');
        return;
      }

      console.log(err.message);
    }
  }
}
