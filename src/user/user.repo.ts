import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import { CreateUserRequest, UpdateUserRequest } from './dto/user.dto';
import { User, UserDocument } from './entity/user.entity';

@Injectable()
export class UserRepo {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createMany(usersList: CreateUserRequest[]): Promise<UserDocument[]> {
    try {
      const savedUsers = await this.userModel.insertMany(usersList);
      return savedUsers;
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicateKeyError(err);
      }
      throw new Error('failed to seed');
    }
  }

  async getOneByMail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email: email, deleted_at: null }, [
      'firstName',
      'email',
    ]);
  }

  async getAllUsers(): Promise<UserDocument[]> {
    try {
      return await this.userModel.find();
    } catch (err) {
      throw new InternalServerErrorException('something went wrong');
    }
  }

  async create(CreateUserRequest: CreateUserRequest): Promise<UserDocument> {
    try {
      const createdUser = new this.userModel(CreateUserRequest);
      return await createdUser.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicateKeyError(err);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ _id: id, deleted_at: null }, [
      '-password',
      '-deleted_at',
    ]);

    return user;
  }

  async getUserPasswordByEmail(email: string) {
    return await this.userModel.findOne({ email }, ['password']);
  }

  async updateUser(
    id: string,
    UpdateUserRequest: UpdateUserRequest,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { ...UpdateUserRequest, updated_at: now() },
    );

    if (updatedUser) {
      return await this.userModel.findById(updatedUser.id, [
        '-password',
        '-deleted_at',
      ]);
    } else throw new NotFoundException(`user not found`);
  }

  async deleteOne(id: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        deleted_at: now(),
      },
      { returnOriginal: false },
    );
    if (deletedUser === null) throw new NotFoundException('user not found');
    return deletedUser;
  }
}
