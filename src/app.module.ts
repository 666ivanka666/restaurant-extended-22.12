import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { MenuItemModule } from './menu_item/menu_item.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [MenuModule, MenuItemModule, RestaurantModule],
})
export class AppModule {}
