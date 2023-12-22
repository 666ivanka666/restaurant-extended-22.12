import { Menu } from 'src/menu/type';

export class Restaurant {
  constructor(
    public id: string,
    public name: string,
    public location: string,
    public rating: number,
    public petFriendly: boolean,
    public menus: Menu[],
  ) {}
}
