export class Menu {
  constructor(
    public id: string,
    public restaurantId: string,
    public title: string,
    public description: string,
    public restaurantIds?: string[],
  ) {}
}
