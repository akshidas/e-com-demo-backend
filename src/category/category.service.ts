import { Injectable } from '@nestjs/common';
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

  //   async getOne
}
