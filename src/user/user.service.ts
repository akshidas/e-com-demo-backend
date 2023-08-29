import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async create() {
    return 'create User';
  }
}
