import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import AlreadyExistsException from './exceptions/already-exists';
import { User } from './user.schema';

@Injectable()
export class UserRepo {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (err) {
      const [key, value] = Object.entries(err.keyValue).flat();
      if (err.code === 11000) {
        throw new AlreadyExistsException(
          'CONFLICT',
          `user with ${key} ${value} already exists`,
        );
      }

      throw new Error('Failed to create user');
    }
  }
}
