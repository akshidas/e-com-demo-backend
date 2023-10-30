import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import EntityNotFound from 'src/shared/utils/errors/entity-not-found.error';
import { CreateUserRequest, UpdateUserRequest } from './dto/user-request.dto';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller({
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'get the list of all users',
  })
  @ApiOkResponse({ description: 'users retrieved successfully' })
  @ApiInternalServerErrorResponse({
    description: 'failed to retrieve list of users',
  })
  @Get()
  async getAll() {
    try {
      return await this.userService.getAll();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.userService.getById(req.id);
    return { data: user };
  }

  @Put('profile')
  async updateProfile(
    @Req() req,
    @Body() UpdateUserRequest: UpdateUserRequest,
  ) {
    const user = await this.userService.updateUser(req.id, UpdateUserRequest);
    return { data: user };
  }

  @ApiCreatedResponse({
    description: 'successfully created user',
  })
  @Post()
  async create(@Body() CreateUserRequest: CreateUserRequest) {
    try {
      const token = await this.userService.create(CreateUserRequest);

      return token;
    } catch (err) {
      if (err instanceof InternalServerErrorException)
        throw new InternalServerErrorException(err.message);

      if (err instanceof DuplicateKeyError)
        throw new ConflictException(err.message);

      throw new HttpException('Something went wrong', 500);
    }
  }

  @Delete()
  async deleteSingleUser(@Req() req) {
    try {
      const deleted = await this.userService.deleteUserById(req.id);
      if (deleted) {
        return { data: deleted.id };
      }
    } catch (err) {
      if (err instanceof EntityNotFound) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException('failed to delete user');
    }
  }
}
