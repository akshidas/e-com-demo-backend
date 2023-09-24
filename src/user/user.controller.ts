import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.userService.getUserByEmail(req.id);
    return { data: user };
  }

  @Put('profile')
  async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(req.id, updateUserDto);
    return { data: user };
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

  @Delete()
  async DeleteSingleUser(@Req() req) {
    try {
      const deleted = await this.userService.deleteUserById(req.id);
      if (deleted) {
        return;
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException('failed to delete user');
    }
  }
}
