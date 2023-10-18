import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import UpdateFailedError from 'src/shared/utils/errors/update-failed.error';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';
import { Product, ProductDocument } from './products.schema';

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

  private async populateCategory(product: ProductDocument) {
    const populated = await product.populate({
      path: 'category',
      select: ['name', 'slug'],
    });

    populated.category_id = undefined;

    return populated;
  }

  async getOneById(id: string) {
    const product = await this.productModel.findOne(
      {
        _id: id,
        deleted_at: null,
      },
      ['-deleted_at', '-updated_at'],
    );

    return this.populateCategory(product);
  }

  async getOneBySlug(slug: string) {
    const product = await this.productModel.findOne(
      {
        slug: slug,
        deleted_at: null,
      },
      ['-deleted_at', '-updated_at'],
    );

    return this.populateCategory(product);
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
