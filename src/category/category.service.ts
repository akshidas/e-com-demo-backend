import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { CategoryRepo } from './category.repo';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepo) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.create(createCategoryDto);
  }

  async getAll() {
    return this.categoryRepo.getAll();
  }

  async getOne(slug: string) {
    if (isValidObjectId(slug)) {
      return this.categoryRepo.getOne(slug);
    } else {
      return this.categoryRepo.getBySlug(slug);
    }
  }
}
