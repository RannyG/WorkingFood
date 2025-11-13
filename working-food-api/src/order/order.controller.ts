import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { CreateOrderDto } from './models/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  create(@Body() body: CreateOrderDto) {
    return this.orderService.create(body);
  }

  @Get('/costumer/:idCostumer')
  getByCostumerId(@Param('idCostumer') idCostumer: number) {
    return this.orderService.getByCostumerId(idCostumer);
  }
}
