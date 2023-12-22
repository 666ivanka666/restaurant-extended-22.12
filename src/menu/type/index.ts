import { MenuItem } from 'src/menu_item/type';
import { Restaurant } from 'src/restaurant/type';

export class Menu {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public menuItems: MenuItem[],
    public restaurants?: Restaurant[],
  ) {}
}
