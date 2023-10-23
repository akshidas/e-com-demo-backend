import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  product: string;

  @IsOptional()
  @IsString()
  user?: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  quantity: number;
}
