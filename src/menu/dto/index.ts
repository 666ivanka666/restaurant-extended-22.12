import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class MenuDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  menuItems: string[];
}
