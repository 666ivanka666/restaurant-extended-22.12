import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantDto } from './dto';
import { Restaurant } from './type';
import { IdDto } from 'src/common/decorators';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  addRestaurant(@Body() body: RestaurantDto): { id: string } {
    const generatedId = this.restaurantService.insertRestaurant(
      body.name,
      body.location,
      body.rating,
      body.petFriendly,
      body.menus,
    );

    return { id: generatedId };
  }
  @Get()
  getAllRestaurant(): Restaurant[] {
    return this.restaurantService.getRestaurant();
  }

  @Get(':id')
  getRestaurantById(@Param() params: IdDto): Restaurant {
    return this.restaurantService.getSingleRestaurant(params.id);
  }

  @Put(':id')
  updateRestaurant(
    @Param() params: IdDto,
    @Body() body: RestaurantDto,
  ): Restaurant {
    const { id } = params;
    return this.restaurantService.updateRestaurant(
      id,
      body.name,
      body.location,
      body.rating,
      body.petFriendly,
    );
  }
  @Delete(':id')
  deleteRestaurantById(@Param() params: IdDto): { message: string } {
    return this.restaurantService.deleteRestaurant(params.id);
  }
}
