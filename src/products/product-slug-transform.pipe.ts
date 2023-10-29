import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateProductsDto } from './dto/products.dto';

@Injectable()
export class ConvertSlug
  implements PipeTransform<CreateProductsDto, CreateProductsDto>
{
  transform(createProductDto: CreateProductsDto): CreateProductsDto {
    const { name, slug } = createProductDto;
    if (Boolean(slug)) return createProductDto;
    createProductDto.slug = name.toLowerCase().replaceAll(' ', '-');
    return createProductDto;
  }
}
