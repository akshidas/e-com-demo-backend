import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Address } from './address.schema';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressRepo {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>,
  ) {}

  async getAllAddressOfCustomerById(customerId: string) {
    const addresses = await this.addressModel.find(
      {
        customer: customerId,
      },
      ['-customer'],
    );
    return addresses;
  }

  async create(createAddressDto: CreateAddressDto, customerId: string) {
    try {
      const createdAddress = new this.addressModel({
        ...createAddressDto,
        customer: customerId,
      });
      return await createdAddress.save();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('failed to create address');
    }
  }

  async updateById(id: Types.ObjectId, updateAddressDto: UpdateAddressDto) {
    const updatedAddress = await this.addressModel.findByIdAndUpdate(
      id,
      {
        ...updateAddressDto,
        updated_at: Date(),
      },
      { new: true, fields: ['-customer'] },
    );

    if (updatedAddress) {
      return updatedAddress;
    }

    throw new NotFoundException('address not found');
  }

  async deleteOneById(id: Types.ObjectId) {
    const deletedAddress = await this.addressModel.findByIdAndDelete(id);

    if (deletedAddress) {
      return { id: deletedAddress.id };
    }

    throw new NotFoundException('address not found');
  }
}
