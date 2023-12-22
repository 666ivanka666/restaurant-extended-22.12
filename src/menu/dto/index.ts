import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { BaseMenuItemDto } from 'src/menu_item/dto';

export class MenuDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseMenuItemDto)
  menuItems: BaseMenuItemDto[];
}
