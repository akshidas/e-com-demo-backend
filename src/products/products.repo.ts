import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import { CreateProductsDto } from './dto/create-products.dto';
import { Product } from './products.schema';

@Injectable()
export class ProductsRepo {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAll() {
    return this.productModel.find({ deleted_at: null }, [
      '-deleted_at',
      '-updated_at',
    ]);
  }

  async createProduct(createProductDto: CreateProductsDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicateKeyError(err);
      }

      throw new InternalServerErrorException('something went wrong');
    }
  }
}
