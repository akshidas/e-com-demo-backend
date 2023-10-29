import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Image } from '../image.schema';

export class CreateImageDto implements Image {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;
}
