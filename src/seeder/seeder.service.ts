import { Injectable } from '@nestjs/common';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import { UserService } from 'src/user/user.service';
import _users from './data/_user.json';

@Injectable()
export class SeederService {
  constructor(private readonly userService: UserService) {}
  async seedUser() {
    try {
      console.log(_users);
      await this.userService.insertMultipleUsers(_users);
      console.log('finished seeding');
    } catch (err) {
      if (err instanceof DuplicateKeyError) {
        console.log('already seeded');
        return;
      }

      console.log(err.message);
    }
  }
}
