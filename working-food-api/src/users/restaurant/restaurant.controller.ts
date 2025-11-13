import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import type { CreateRestaurantDto } from './models/create-restaurant.dto';
import { RestaurantService } from './restaurant.service';
import { Public } from 'src/core/annotation/public.annotation';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @HttpCode(201)
  @HttpCode(400)
  @Post()
  @Public()
  create(@Body() body: CreateRestaurantDto) {
    return this.restaurantService.create(body);
  }
}
