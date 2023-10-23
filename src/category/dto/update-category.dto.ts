import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';
import { Category } from '../category.schema';

export class UpdateCategoryDto implements Category {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @Matches(/^[a-z0-9-]+$/)
  @ApiProperty()
  slug: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  status: boolean;

  deleted_at?: Date;
  updated_at?: Date;
}
