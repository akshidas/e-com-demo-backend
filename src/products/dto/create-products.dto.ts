import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';
import { Image } from 'src/images/image.schema';

export class CreateProductsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sku: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  images: Image[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  @ApiProperty()
  slug: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  status: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  category_id: string;
}
