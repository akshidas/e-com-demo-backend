import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller({
  version: '1',
})
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoryService.create(
      createCategoryDto,
    );

    if (createCategoryDto) {
      return { date: createdCategory };
    }
  }

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }
}
