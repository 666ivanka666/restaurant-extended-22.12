import { Injectable, NotAcceptableException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Menu } from './type';
import { RestaurantService } from 'src/restaurant/restaurant.service';

@Injectable()
export class MenuService {
  private menus: Menu[] = [];
  constructor(private readonly restaurantService: RestaurantService) {}

  // insertMenu(
  //   restaurantId: string,
  //   title: string,
  //   description: string,
  //   menusItems: MenuItem[],
  // ): string {
  //   const menuId = uuidv4();
  //   this.restaurantService.findRestaurant(restaurantId);
  //   this.menus.push(
  //     new Menu(menuId, restaurantId, title, description, menusItems),
  //   );
  //   return menuId;
  // }

  // INSERT MENU NIJE DOBAR
  insertMenu(
    restaurantId: string,
    title: string,
    description: string,
    menuItems: string[],
  ): string {
    const menuId = uuidv4();
    this.restaurantService.findRestaurant(restaurantId);
    const menuItemObjects: Menu[] = menuItems.map((item: string) => ({
      name: item,
      description: '',
      title: '',
      id: '',
      restaurantId: restaurantId,
      menuId: menuId,
      price: 0,
    }));

    this.menus.push(new Menu(menuId, restaurantId, title, description));

    return menuId;
  }

  getMenu(): Menu[] {
    return this.menus;
  }
  getSingleMenu(menuId: string): Menu {
    const [menu] = this.findMenu(menuId);
    return menu;
  }

  updateMenu(
    menuId: string,
    restaurantId: string,
    title: string,
    description: string,
  ): Menu {
    this.restaurantService.findRestaurant(restaurantId);

    const [menu] = this.findMenu(menuId);

    if (restaurantId) {
      menu.restaurantId = restaurantId;
    }
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

  assignRestaurant(menu: Menu, restaurantId: string) {
    if (!menu.restaurantIds) {
      menu.restaurantIds = [];
    }
    menu.restaurantIds.push(restaurantId);
  }
}
