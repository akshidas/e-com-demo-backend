import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
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
      return { data: createdCategory };
    }
  }

  @Get()
  async getAll() {
    const categories = await this.categoryService.getAll();
    return { data: categories };
  }

  @Get(':slug')
  async getOne(@Param('slug') slug: string) {
    const category = await this.categoryService.getOne(slug);
    if (category) return { data: category };

    throw new InternalServerErrorException('something went wrong');
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const status = await this.categoryService.deleteOne(id);
    if (status) return { data: id };
    throw new InternalServerErrorException('something went wrong');
  }
}
