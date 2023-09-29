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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller()
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    const user = await this.customerService.getById(req.id);
    return { data: user };
  }

  @Put('profile')
  async updateProfile(
    @Req() req,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const user = await this.customerService.updateUser(
      req.id,
      updateCustomerDto,
    );
    return { data: user };
  }

  @Post()
  async create(@Body() updateCustomerDto: CreateCustomerDto) {
    try {
      const token = await this.customerService.create(updateCustomerDto);

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
      const deleted = await this.customerService.deleteUserById(req.id);
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
