import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Restaurant } from './type';
import { v4 as uuidv4 } from 'uuid';
import { Menu } from 'src/menu/type';
import { MenuDto } from 'src/menu/dto';
import { MenuItem } from 'src/menu_item/type';

@Injectable()
export class RestaurantService {
  private restaurants: Restaurant[] = [];

  insertRestaurant(
    name: string,
    location: string,
    rating: number,
    petFriendly: boolean,
    menus: MenuDto[],
  ): string {
    const restaurantId = uuidv4();

    const listOfMenus: Menu[] = menus.map(
      ({ title, description, menuItems }) => {
        const listOfMenuItems = menuItems.map(({ title }) => {
          const menuItemId = uuidv4();

          return new MenuItem(menuItemId, title);
        });

        const menuId = uuidv4();
        return new Menu(menuId, title, description, listOfMenuItems);
      },
    );

    this.restaurants.push(
      new Restaurant(
        restaurantId,
        name,
        location,
        rating,
        petFriendly,
        listOfMenus,
      ),
    );

    return restaurantId;
  }

  getRestaurant(): Restaurant[] {
    return this.restaurants;
  }

  getSingleRestaurant(restaurantId: string): Restaurant {
    const [restaurant] = this.findRestaurant(restaurantId);
    return restaurant;
  }
  updateRestaurant(
    restaurantId: string,
    name: string,
    location: string,
    rating: number,
    petFriendly: boolean,
  ): Restaurant {
    const [restaurant] = this.findRestaurant(restaurantId);

    if (name) {
      restaurant.name = name;
    }
    if (location) {
      restaurant.location = location;
    }
    if (rating) {
      restaurant.rating = rating;
    }
    if (petFriendly) {
      restaurant.petFriendly = petFriendly;
    }

    return restaurant;
  }

  deleteRestaurant(lectureId: string) {
    const [, index] = this.findRestaurant(lectureId);
    this.restaurants.splice(index, 1);
    return { message: 'Uspjesno obrisano' };
  }

  findRestaurant(id: string): [Restaurant, number] {
    const restaurantIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    if (restaurantIndex === -1) {
      throw new NotAcceptableException(`Restaurant with ID ${id} not found`);
    }
    return [this.restaurants[restaurantIndex], restaurantIndex];
  }

  assignMenu(restaurant: Restaurant, menu: Menu) {
    if (!restaurant.menus) {
      restaurant.menus = [];
    }
    restaurant.menus.push(menu);
  }
}
