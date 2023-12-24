import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import EntityNotFound from 'src/shared/utils/errors/entity-not-found.error';
import Failure from 'src/shared/utils/errors/failed.error';
import UpdateFailedError from 'src/shared/utils/errors/update-failed.error';
import { CreateProductRequest, UpdateProductRequest } from './dto/products.dto';
import { Product } from './products.schema';

type Filter = {
  slug?: string;
  _id?: Types.ObjectId | string;
};

@Injectable()
export class ProductsRepo {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async insertMany(productList: CreateProductRequest[]) {
    return this.productModel.insertMany(productList);
  }

  async getAll() {
    return this.productModel
      .find({ deleted_at: null }, [
        '-deleted_at',
        '-updated_at',
        '-description',
      ])
      .populate({
        path: 'category',
        select: ['name', 'slug'],
      })
      .populate({ path: 'images', select: ['url', 'name'] });
  }

  private async findOne(filter: Filter) {
    try {
      const populated = await this.productModel
        .findOne(
          {
            ...filter,
            deleted_at: null,
          },
          ['-deleted_at', '-updated_at'],
        )
        .populate({
          path: 'category',
          select: ['name', 'slug'],
        })
        .populate({ path: 'images', select: ['name', 'url'] });

      if (populated) {
        populated.category_id = undefined;

        return populated;
      }
      throw new EntityNotFound('the resource does not exist');
    } catch (err) {
      if (err instanceof TypeError) {
        throw new EntityNotFound('the resource does not exist');
      }
      if (err instanceof EntityNotFound) throw new EntityNotFound(err.message);

      throw new Failure(err.message);
    }
  }

  async getOneById(id: string) {
    return this.findOne({ _id: id });
  }

  async getOneBySlug(slug: string) {
    return this.findOne({ slug: slug });
  }

  async createProduct(createProductDto: Product): Promise<Product> {
    try {
      const newProduct = new this.productModel(createProductDto);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicateKeyError(err);
      }

      throw new Failure('something went wrong');
    }
  }

  async updateProductById(
    id: string,
    UpdateProductRequest: UpdateProductRequest,
  ) {
    try {
      const updatedProduct = await this.productModel.findOneAndUpdate(
        { _id: id, deleted_at: null },
        UpdateProductRequest,
        {
          returnOriginal: false,
        },
      );
      if (updatedProduct) {
        return this.findOne({ _id: updatedProduct._id });
      }
    } catch (err) {
      throw new UpdateFailedError(id);
    }
  }

  async updateProductBySlug(
    slug: string,
    UpdateProductRequest: UpdateProductRequest,
  ) {
    try {
      const updatedProduct = await this.productModel.findOneAndUpdate(
        { slug: slug, deleted_at: null },
        UpdateProductRequest,
        {
          returnOriginal: false,
        },
      );

      if (updatedProduct) {
        return this.findOne({ _id: updatedProduct._id });
      }
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicateKeyError(err);
      }
      throw new UpdateFailedError(slug);
    }
  }
}
