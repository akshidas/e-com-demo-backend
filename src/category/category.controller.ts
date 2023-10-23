import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@ApiBearerAuth()
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

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedData = await this.categoryService.updateOne(
      id,
      updateCategoryDto,
    );

    if (updatedData) {
      return { data: updatedData };
    }

    throw new InternalServerErrorException('something went wrong');
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    const status = await this.categoryService.deleteOne(id);
    if (status) return { data: id };
    throw new InternalServerErrorException('something went wrong');
  }
}
