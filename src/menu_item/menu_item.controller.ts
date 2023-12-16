import { Controller, Body, Put } from '@nestjs/common';
import { MenuItemService } from './menu_item.service';
import { MenuItemDto } from './dto';

@Controller('menuitem')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Put()
  updateMenuItem(@Body() body: MenuItemDto) {
    return this.menuItemService.updateMenuItem(body.restaurantId, body.menuId);
  }
}
