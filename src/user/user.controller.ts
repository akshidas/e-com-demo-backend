import { Body, Controller, Get, Post } from '@nestjs/common';
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create();
  }
}
