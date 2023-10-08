import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryRepo {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = new this.categoryModel(createCategoryDto);
      return await createdCategory.save();
    } catch (err) {
      if (err.code) {
        throw new ConflictException(`${createCategoryDto.name} already exists`);
      }

      throw new InternalServerErrorException(err.message);
    }
  }

  async getAll() {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async getOne(filter: { id?: string; slug: string }) {
    const category = await this.categoryModel.findOne(filter);

    if (category) {
      return category;
    }

    throw new NotFoundException('category not found');
  }
}
