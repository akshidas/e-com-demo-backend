import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Get()
  async getAll(@Req() req) {
    try {
      const addresses = await this.addressService.getAddressByCustomerId(
        req.id,
      );

      return { data: addresses };
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  @Post()
  async create(@Req() req, @Body() createAddressDto: CreateAddressDto) {
    const savedAddress = await this.addressService.create(
      createAddressDto,
      req.id,
    );

    return { data: savedAddress };
  }

  @Delete(':id')
  async deleteOneById(@Param() id: string) {
    try {
      const deletedAddress = await this.addressService.deleteOneById(
        new Types.ObjectId(id),
      );

      if (deletedAddress) {
        return { data: deletedAddress };
      }
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new NotFoundException(err.message);
      }

      throw new InternalServerErrorException('something went wrong');
    }
  }
}
