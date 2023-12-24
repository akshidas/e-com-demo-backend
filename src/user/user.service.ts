import { Injectable } from '@nestjs/common';
import { LoggedInSuccessResponse } from 'src/auth/dto/login.dto';
import { GroupService } from 'src/group/group.service';
import EntityNotFound from 'src/shared/utils/errors/entity-not-found.error';
import Failure from 'src/shared/utils/errors/failed.error';
import genJwt from 'src/shared/utils/gen-jwt';
import { CreateUserRequest, UpdateUserRequest } from './dto/user-request.dto';
import { DeletedUserResponse } from './dto/user-response.dto';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly groupService: GroupService,
  ) {}

  async getAll() {
    const usersList = await this.userRepo.getAllUsers();
    return usersList;
  }

  async insertMultipleUsers(usersList: CreateUserRequest[]) {
    return this.userRepo.createMany(usersList);
  }

  async getAdmin() {
    const admin = await this.userRepo.getOneByMail('admin@gmail.com');
    if (admin) return admin;
    throw new EntityNotFound('admin@gmail.com');
  }

  async create(
    CreateUserRequest: CreateUserRequest,
  ): Promise<LoggedInSuccessResponse> {
    const createdUser = await this.userRepo.create(CreateUserRequest);
    const token = await genJwt({ id: createdUser.id, isAdmin: false });
    return { token };
  }

  async getById(id: string) {
    const user = await this.userRepo.getUserById(id);
    const isAdmin = await this.groupService.isAdmin(id);
    if (user === null) throw new EntityNotFound(`user does not exist`);
    return { ...user.toObject(), isAdmin };
  }

  async updateUser(id: string, UpdateUserRequest: UpdateUserRequest) {
    try {
      return this.userRepo.updateUser(id, UpdateUserRequest);
    } catch (err) {
      throw new Failure('failed to update user');
    }
  }

  async getUserPasswordByEmail(email: string) {
    const user = await this.userRepo.getUserPasswordByEmail(email);
    if (user === null)
      throw new EntityNotFound(`user with email ${email} not found`);
    return user;
  }

  async deleteUserById(id: string): Promise<DeletedUserResponse> {
    const deletedUser = await this.userRepo.deleteOne(id);
    if (deletedUser) {
      return deletedUser.id;
    }
  }
}
