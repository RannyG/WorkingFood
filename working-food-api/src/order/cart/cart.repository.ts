import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUpdateItemCartDto } from './models/create-update-item-cart.dto';
import { ItemCartDto } from './models/item-cart.dto';

@Injectable()
export class CartRepository {
  constructor(private prismaService: PrismaService) {}

  async create(body: CreateUpdateItemCartDto) {
    const itemCartAlreadyExists = await this.prismaService.cart.findFirst({
      where: {
        idProduct: body.idProduct,
        idCostumer: body.idCostumer,
      },
    });
    try {
      if (!itemCartAlreadyExists) {
        await this.prismaService.cart.create({
          data: {
            amount: body.amount,
            idCostumer: body.idCostumer,
            idProduct: body.idProduct,
          },
        });

        return true;
      }

      return this.update(body);
    } catch {
      return false;
    }
  }

  async update(body: CreateUpdateItemCartDto) {
    try {
      const alreadyExistentItem = await this.prismaService.cart.findFirst({
        where: {
          idCostumer: body.idCostumer,
          idProduct: body.idProduct,
        },
      });

      if (alreadyExistentItem === null) return alreadyExistentItem;

      await this.prismaService.cart.update({
        data: {
          amount: body.amount,
          idProduct: alreadyExistentItem.idProduct,
          idCostumer: alreadyExistentItem.idCostumer,
        },
        where: {
          idCostumer_idProduct: {
            idCostumer: body.idCostumer,
            idProduct: body.idProduct,
          },
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  async getByCostumer(idCostumer: number): Promise<ItemCartDto[]> {
    const itemsCart = await this.prismaService.cart.findMany({
      where: {
        idCostumer: idCostumer,
      },
      select: {
        amount: true,
        idProduct: true,
        idCostumer: true,
        product: {
          select: {
            price: true,
          },
        },
      },
    });

    return itemsCart.map((item) => {
      return {
        amount: item.amount,
        idCostumer: Number(item.idCostumer),
        idProduct: Number(item.idProduct),
        finalPrice:
          item.product !== null ? item.amount * Number(item.product.price) : 0,
      };
    });
  }

  async remove(idCostumer: number, idProduct: number) {
    try {
      await this.prismaService.cart.delete({
        where: {
          idCostumer_idProduct: {
            idCostumer: idCostumer,
            idProduct: idProduct,
          },
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  async existsById(idCostumer: number, idProduct: number) {
    const itemCartExists = await this.prismaService.cart.findFirst({
      where: {
        idCostumer: idCostumer,
        idProduct: idProduct,
      },
    });

    return itemCartExists !== null;
  }
}
