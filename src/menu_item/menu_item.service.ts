import { Injectable, NotAcceptableException } from '@nestjs/common';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { MenuService } from 'src/menu/menu.service';

@Injectable()
export class MenuItemService {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly menuService: MenuService,
  ) {}

  updateMenuItem(restaurantId: string, menuId: string) {
    const [menu] = this.menuService.findMenu(menuId);
    const [restaurant] = this.restaurantService.findRestaurant(restaurantId);

    this.menuService.assignRestaurant(menu, restaurantId);
    this.restaurantService.assignMenu(restaurant, menuId);

    return 'Relationship successfully established';
  }
}
