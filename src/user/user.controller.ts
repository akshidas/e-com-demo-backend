import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
      console.error(err);
      throw new HttpException('Something went wrong', 500);
    }
  }
}
