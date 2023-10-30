import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateProductRequest } from './dto/products.dto';

@Injectable()
export class ConvertSlug
  implements PipeTransform<CreateProductRequest, CreateProductRequest>
{
  transform(createProductDto: CreateProductRequest): CreateProductRequest {
    const { name, slug } = createProductDto;
    if (Boolean(slug)) return createProductDto;
    createProductDto.slug = name.toLowerCase().replaceAll(' ', '-');
    return createProductDto;
  }
}
