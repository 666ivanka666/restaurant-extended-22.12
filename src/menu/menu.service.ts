import { Injectable, NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Menu } from './type';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Restaurant } from 'src/restaurant/type';
import { BaseMenuItemDto } from 'src/menu_item/dto';
import { MenuItem } from 'src/menu_item/type';

@Injectable()
export class MenuService {
  private menus: Menu[] = [];
  constructor(private readonly restaurantService: RestaurantService) {}

  insertMenu(
    title: string,
    description: string,
    menuItems: BaseMenuItemDto[],
  ): string {
    const menuId = uuidv4();
    const listOfMenuItems = menuItems.map(({ title }) => {
      const menuItemId = uuidv4();
      return new MenuItem(menuItemId, title);
    });

    this.menus.push(new Menu(menuId, title, description, listOfMenuItems));

    return menuId;
  }

  getMenu(): Menu[] {
    return this.menus;
  }
  getSingleMenu(menuId: string): Menu {
    const [menu] = this.findMenu(menuId);
    return menu;
  }

  updateMenu(menuId: string, title: string, description: string): Menu {
    const [menu] = this.findMenu(menuId);

    if (title) {
      menu.title = title;
    }
    if (description) {
      menu.description = description;
    }

    return menu;
  }

  deleteMenu(menuId: string): { message: string } {
    const [, index] = this.findMenu(menuId);
    this.menus.splice(index, 1);
    return { message: 'Uspijesno izbrisano' };
  }

  findMenu(id: string): [Menu, number] {
    const menuIndex = this.menus.findIndex((menu) => menu.id === id);
    if (menuIndex === -1) {
      throw new NotAcceptableException(` Menu with ID ${id} not found`);
    }

    return [this.menus[menuIndex], menuIndex];
  }

  assignRestaurant(menu: Menu, restaurant: Restaurant) {
    if (!menu.restaurants) {
      menu.restaurants = [];
    }
    menu.restaurants.push(restaurant);
  }
}
