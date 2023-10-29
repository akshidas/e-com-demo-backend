import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the category',
    example: 'Category Test',
  })
  name: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9-]+$/)
  @ApiProperty({
    description: 'Slug that will be used to identify the category',
    example: 'category-test',
  })
  slug: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'This property identifies of the category is active or not',
    default: true,
  })
  status: boolean;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  deleted_at?: Date;
  updated_at?: Date;
}
