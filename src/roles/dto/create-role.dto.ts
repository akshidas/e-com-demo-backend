import { IsNotEmpty, IsString } from 'class-validator';
import { Roles } from '../types/role.type';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: Roles;

  @IsString()
  @IsNotEmpty()
  description: string;
}
