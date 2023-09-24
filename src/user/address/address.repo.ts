import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from './address.schema';

@Injectable()
export class AddressRepo {
  constructor(@InjectModel(Address.name) private userModel: Model<Address>) {}
}
