import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Restaurant } from './type';
import { v4 as uuidv4 } from 'uuid';
import { Menu } from 'src/menu/type';

@Injectable()
export class RestaurantService {
  private restaurants: Restaurant[] = [];

  // insertRestaurant(
  //   name: string,
  //   location: string,
  //   rating: string,
  //   petFriendly: string,
  //   menus: Menu[],
  // ): string {
  //   const restaurantId = uuidv4();
  //   this.restaurants.push(
  //     new Restaurant(restaurantId, name, location, rating, petFriendly, menus),
  //   );
  //   return restaurantId;
  // }

  insertRestaurant(
    name: string,
    location: string,
    rating: string,
    petFriendly: string,
    menus: string[],
  ): string {
    const restaurantId = uuidv4();

    const menuObjects: Menu[] = menus.map((menuName: string) => {
      const menuId = uuidv4();

      return new Menu(menuId, restaurantId, menuName, '', []);
    });

    this.restaurants.push(
      new Restaurant(
        restaurantId,
        name,
        location,
        rating,
        petFriendly,
        menuObjects,
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
    rating: string,
    petFriendly: string,
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

  assignMenu(restaurant: Restaurant, menuId: string) {
    if (!restaurant.menuIds) {
      restaurant.menuIds = [];
    }
    restaurant.menuIds.push(menuId);
  }
}
