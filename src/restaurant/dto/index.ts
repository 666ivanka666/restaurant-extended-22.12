import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { MenuDto } from 'src/menu/dto';

export class RestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsBoolean()
  @IsNotEmpty()
  petFriendly: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuDto)
  menus: MenuDto[];
}
