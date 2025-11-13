import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { CreateUpdateItemCartDto } from './models/create-update-item-cart.dto';
import { CartRepository } from './cart.repository';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    private cartRepository: CartRepository,
    private productService: ProductService,
  ) {}

  async create(body: CreateUpdateItemCartDto) {
    if (
      !(await this.productService.amountIsAvailable(
        body.idProduct,
        body.amount,
      ))
    )
      throw new BadRequestException(
        'A quantidade solicitada não está disponível no estoque',
      );

    return this.cartRepository.create(body);
  }

  async update(body: CreateUpdateItemCartDto) {
    if (
      !(await this.productService.amountIsAvailable(
        body.idProduct,
        body.amount,
      ))
    )
      throw new BadRequestException(
        'A quantidade solicitada não está disponível no estoque',
      );

    return this.cartRepository.update(body);
  }

  async remove(idCostumer: number, idProduct: number) {
    if (!(await this.cartRepository.existsById(idCostumer, idProduct)))
      return new NotFoundException('Item não encontrado no carrinho.');

    return this.cartRepository.remove(idCostumer, idProduct);
  }

  getByCostumer(idCostumer: number) {
    return this.cartRepository.getByCostumer(idCostumer);
  }
}
