import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import AlreadyExistsException from './exceptions/already-exists';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAll(user: CreateUserDto) {
    return 'All Users';
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const userCreated = await this.userService.create(createUserDto);
      return userCreated;
    } catch (err) {
      if (err instanceof AlreadyExistsException) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }
      throw new HttpException('Something went wrong', 500);
    }
  }
}
