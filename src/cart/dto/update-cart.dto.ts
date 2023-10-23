import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  quantity: number;
}
