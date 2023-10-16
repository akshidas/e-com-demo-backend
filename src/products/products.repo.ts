import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductsDto } from './dto/create-products.dto';
import { Product } from './products.schema';

@Injectable()
export class ProductsRepo {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductsDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (err) {
      if (err.code === 11000) {
        console.log(err.keyValue);
        throw new ConflictException(err.message);
      }

      throw new InternalServerErrorException('something went wrong');
    }
  }
}
