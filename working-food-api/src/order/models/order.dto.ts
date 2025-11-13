import { OrderSituation } from 'generated/prisma';
import { ItemOrderProductDto } from './item-order-product.dto';

export interface OrderDto {
  items: ItemOrderProductDto[];
  cepToDelivery: string;
  numberToDelivery: string;
  situation: OrderSituation;
  requestDate: Date;
}
