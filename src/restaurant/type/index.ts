// export interface Menu {
// }  pitati merka koje je ispravno

import { Menu } from 'src/menu/type';

export class Restaurant {
  constructor(
    public id: string,
    public name: string,
    public location: string,
    public rating: string, //ako stavim number javlja gresku
    public petFriendly: string, //ako stavim boolean javlja gresku
    public menus: Menu[],
    public menuIds?: string[],
  ) {}
}
