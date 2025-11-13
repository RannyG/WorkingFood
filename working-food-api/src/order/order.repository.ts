import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './models/create-order.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { OrderSituation } from 'generated/prisma';
import { ProductWithPriceDto } from './product/models/product-with-price.dto';
import { OrderDto } from './models/order.dto';

@Injectable()
export class OrderRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    body: CreateOrderDto,
    productWithPrices: ProductWithPriceDto[],
  ): Promise<boolean> {
    try {
      await this.prismaService.order.create({
        data: {
          idCostumer: body.idCostumer,
          cepToDelivery: body.cepToDelivery,
          numberToDelivery: body.numberToDelivery,
          requestDate: new Date(),
          situation: OrderSituation.RECEIVED,
          purchase: {
            createMany: {
              data: body.items.map((item) => {
                return {
                  amount: item.amount,
                  idProduct: item.idProduct,
                  unitaryPrice:
                    productWithPrices.find((item) => item.id == item.id)
                      ?.price ?? 0,
                };
              }),
            },
          },
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  async getByCostumerId(costumerId: number): Promise<OrderDto[]> {
    const ordersByCostumerId = await this.prismaService.order.findMany({
      where: {
        idCostumer: costumerId,
      },
      select: {
        cepToDelivery: true,
        numberToDelivery: true,
        situation: true,
        requestDate: true,
        purchase: {
          select: {
            product: {
              select: {
                name: true,
              },
            },
            amount: true,
            unitaryPrice: true,
          },
        },
      },
    });

    const mappedOrders: OrderDto[] = ordersByCostumerId.map((order) => {
      return {
        cepToDelivery: order.cepToDelivery,
        numberToDelivery: order.numberToDelivery,
        requestDate: order.requestDate,
        situation: order.situation,
        items: order.purchase.map((item) => ({
          productName: item.product.name,
          amount: item.amount,
          unitaryPrice: Number(item.unitaryPrice),
          finalPrice: Number(item.unitaryPrice) * item.amount,
        })),
      };
    });

    return mappedOrders;
  }
}
