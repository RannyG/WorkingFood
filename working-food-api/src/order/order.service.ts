import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { ProductService } from './product/product.service';
import { CostumerService } from 'src/users/costumer/costumer.service';
import { CreateOrderDto } from './models/create-order.dto';
import { ProductWithStockDto } from './product/models/product-with-stock.dto';
import { OrderDto } from './models/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productService: ProductService,
    private costumerService: CostumerService,
  ) {}

  async create(body: CreateOrderDto): Promise<boolean> {
    await this.validateCreate(body);

    const productsWithPrices = await this.productService.getPricesByIds(
      body.items.map((item) => item.idProduct),
    );

    return await this.orderRepository.create(body, productsWithPrices);
  }

  private async validateCreate(body: CreateOrderDto): Promise<void> {
    if (!(await this.costumerService.existsById(body.idCostumer)))
      throw new NotFoundException('Cliente não encontrado');

    if (body.items.length == 0)
      throw new BadRequestException(
        'É necessário escolher ao menos um item para realizar o pedido.',
      );

    if (
      !(await this.productService.existsByIds(
        body.items.map((item) => item.idProduct),
      ))
    )
      throw new NotFoundException(
        'Um ou mais produtos não se encontra disponível.',
      );

    const productWithStock: ProductWithStockDto[] = body.items.map((item) => {
      return {
        id: item.idProduct,
        stockCount: item.amount,
      };
    });

    if (await this.productService.someStockIsOutOrRange(productWithStock))
      throw new BadRequestException(
        'Algum dos itens selecionados para compra não está mais com estoque disponível.',
      );
  }

  async getByCostumerId(costumerId: number): Promise<OrderDto[]> {
    return this.orderRepository.getByCostumerId(costumerId);
  }
}
