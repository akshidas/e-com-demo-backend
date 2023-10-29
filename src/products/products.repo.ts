import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import DuplicateKeyError from 'src/shared/utils/errors/duplicate-key.error';
import UpdateFailedError from 'src/shared/utils/errors/update-failed.error';
import { CreateProductsDto, UpdateProductDto } from './dto/products.dto';
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

  async insertMany(productList: CreateProductsDto[]) {
    return this.productModel.insertMany(productList);
  }

  async getAll() {
    return this.productModel.find({ deleted_at: null }, [
      '-deleted_at',
      '-updated_at',
    ]);
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
      throw new NotFoundException('the resource does not exist');
    } catch (err) {
      if (err instanceof TypeError) {
        throw new NotFoundException('the resource does not exist');
      }
      if (err instanceof NotFoundException)
        throw new NotFoundException(err.message);

      throw new InternalServerErrorException(err.message);
    }
  }

  async getOneById(id: string) {
    return this.findOne({ _id: id });
  }

  async getOneBySlug(slug: string) {
    return this.findOne({ slug: slug });
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
      const updatedProduct = await this.productModel.findOneAndUpdate(
        { _id: id, deleted_at: null },
        updateProductDto,
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

  async updateProductBySlug(slug: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel.findOneAndUpdate(
        { slug: slug, deleted_at: null },
        updateProductDto,
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
