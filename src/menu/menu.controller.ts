import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './type';
import { IdDto } from 'src/common/decorators';
import { MenuDto } from './dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  addMenu(@Body() body: MenuDto): { id: string } {
    const generatedId = this.menuService.insertMenu(
      body.title,
      body.description,
      body.menuItems,
    );

    return { id: generatedId };
  }

  @Get()
  getAllMenus(): Menu[] {
    return this.menuService.getMenu();
  }

  @Get(':id')
  getMenuById(@Param() params: IdDto): Menu {
    return this.menuService.getSingleMenu(params.id);
  }

  @Put(':id')
  updateMenu(@Param() params: IdDto, @Body() body: MenuDto): Menu {
    const { id } = params;
    return this.menuService.updateMenu(id, body.title, body.description);
  }

  @Delete(':id')
  deleteMenuById(@Param() params: IdDto): { message: string } {
    return this.menuService.deleteMenu(params.id);
  }
}
