import { Module } from '@nestjs/common';
import { MenuItemController } from './menu_item.controller';
import { MenuItemService } from './menu_item.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [RestaurantModule, MenuModule],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
