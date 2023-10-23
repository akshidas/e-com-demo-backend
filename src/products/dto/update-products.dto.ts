import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Types } from 'mongoose';
import { Image } from 'src/images/image.schema';
import { Product } from '../products.schema';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  sku: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  price: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  images: Image[];

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  @ApiProperty()
  slug: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  status: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  category_id: string;

  @IsOptional()
  @ApiProperty()
  deleted_at?: Date;
}
