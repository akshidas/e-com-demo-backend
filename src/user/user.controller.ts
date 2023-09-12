import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.userService.getUserByEmail(req.email);
    return { data: user };
  }

  @Get()
  getAll(user: CreateUserDto) {
    return 'All Users';
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const token = await this.userService.create(createUserDto);

      return { data: token };
    } catch (err) {
      if (err instanceof InternalServerErrorException)
        throw new InternalServerErrorException(err.message);

      if (err instanceof ConflictException)
        throw new ConflictException(err.message);

      throw new HttpException('Something went wrong', 500);
    }
  }
}
