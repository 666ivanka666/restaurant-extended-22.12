import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class MenuItemDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  menuId: string;
}

export class BaseMenuItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
