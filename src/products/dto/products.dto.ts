import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateProductRequest {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Name of the product', example: 'Product One' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Description for the product',
    example:
      'Eiusmod consequat enim culpa non ea id dolor sunt tempor proident irure ipsum aliqua. Et laboris aliquip ex labore labore exercitation in ipsum sit nostrud ipsum incididunt reprehenderit. Laboris dolore commodo anim excepteur magna qui laboris incididunt consequat. Fugiat eu est veniam in voluptate do deserunt aliqua ea duis nisi. Enim occaecat magna officia Lorem magna cillum laboris exercitation esse amet. Culpa ut qui cillum commodo tempor laborum voluptate culpa laboris consectetur. Cillum amet cillum amet sint commodo ea reprehenderit aute laboris laboris minim.',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Identifier of the product' })
  sku: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id arrays of product images' })
  images: string[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Price of the product' })
  price: number;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  @ApiProperty({
    description: 'Slug that will be used to identify the product',
    example: 'product-one',
  })
  slug: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'This property identifies of the category is active or not',
    default: true,
  })
  status: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Id of the category this product falls under' })
  category_id: string;
}

export class UpdateProductRequest extends PartialType(CreateProductRequest) {
  deleted_at?: Date;
}
