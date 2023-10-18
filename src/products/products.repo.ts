import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import UpdateFailedError from 'src/shared/utils/errors/update-failed.error';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
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

  async getOneById(id: string) {
    return await this.productModel
      .findOne(
        {
          _id: id,
          deleted_at: null,
        },
        ['-deleted_at', '-updated_at'],
      )
      .populate({
        path: 'category_id',
        select: ['name', 'slug'],
      })
      .exec();
  }
  async getOneBySlug(slug: string) {
    return await this.productModel
      .findOne(
        {
          slug: slug,
          deleted_at: null,
        },
        ['-deleted_at', '-updated_at'],
      )
      .populate({
        path: 'category_id',
        select: ['name', 'slug'],
      })
      .exec();
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

  async updateProductById(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = this.productModel.findOneAndUpdate(
        { _id: id, deleted_at: null },
        updateProductDto,
        {
          returnOriginal: false,
        },
      );

      return updatedProduct;
    } catch (err) {
      console.log(err);
      throw new UpdateFailedError(id);
    }
  }

  async updateProductBySlug(slug: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel.findOneAndUpdate(
        { slug: slug, deleted_at: null },
        updateProductDto,
        {
          returnOriginal: false,
        },
      );

      return updatedProduct;
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicateKeyError(err);
      }
      throw new UpdateFailedError(slug);
    }
  }
}
