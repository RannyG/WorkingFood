import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import type { CreateUpdateItemCartDto } from './models/create-update-item-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  create(@Body() body: CreateUpdateItemCartDto) {
    return this.cartService.create(body);
  }

  @Put()
  update(@Body() body: CreateUpdateItemCartDto) {
    return this.cartService.update(body);
  }

  @Get(':idCostumer')
  getByCostumer(@Param(':idCostumer') idCostumer: number) {
    return this.cartService.getByCostumer(idCostumer);
  }

  @Delete(':idCostumer/:idProduct')
  delete(
    @Param('idCostumer') idCostumer: number,
    @Param('idProduct') idProduct: number,
  ) {
    return this.cartService.remove(idCostumer, idProduct);
  }
}
