import { ItemOrderDto } from './item-order.dto';

export interface CreateOrderDto {
  items: ItemOrderDto[];
  cepToDelivery: string;
  numberToDelivery: string;
  idCostumer: number;
}
