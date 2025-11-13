import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProductDto } from './models/create-product.dto';
import { ProductDto } from './models/product.dto';
import { UpdateProductDto } from './models/update-product.dto';
import { LinkProductCategoryDto } from './models/link-product-category.dto';
import { ProductWithCategory } from './models/product-with-category.dto';
import { ProductWithStockDto } from './models/product-with-stock.dto';
import { ProductWithPriceDto } from './models/product-with-price.dto';

@Injectable()
export class ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async create(body: CreateProductDto): Promise<boolean> {
    try {
      await this.prismaService.product.create({
        data: {
          name: body.name,
          description: body.description,
          isAvailable: body.isAvailable,
          price: body.price,
          stockCount: body.stockCount,
          restaurantId: body.idRestaurant,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  async findByName(name: string): Promise<boolean> {
    const productAlreadyExists = await this.prismaService.product.findFirst({
      where: {
        name: name,
      },
    });

    return productAlreadyExists !== null;
  }

  async existsById(id: number): Promise<boolean> {
    const productAlreadyExists = await this.prismaService.product.findFirst({
      where: {
        id: id,
      },
    });

    return productAlreadyExists !== null;
  }

  async findById(id: number): Promise<ProductWithCategory | null> {
    const foundProduct = await this.prismaService.product.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        isAvailable: true,
        restaurantId: false,
        stockCount: true,
        productCategory: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (foundProduct === null) return foundProduct;

    const mappedProduct: ProductWithCategory = {
      id: Number(foundProduct.id),
      price: Number(foundProduct.price),
      categories: foundProduct.productCategory.map((pc) => {
        return {
          id: Number(pc.category.id),
          name: pc.category.name,
        };
      }),
      name: foundProduct.name,
      description: foundProduct.description,
      isAvailable: foundProduct.isAvailable,
      stockCount: foundProduct.stockCount,
    };

    return mappedProduct;
  }

  async getByRestaurantId(restaurantId: number): Promise<ProductDto[]> {
    const products = await this.prismaService.product.findMany({
      where: {
        restaurantId: restaurantId,
      },
      omit: {
        restaurantId: true,
      },
    });

    const mappedProducts: ProductDto[] = products.map((product) => {
      return {
        ...product,
        id: Number(product.id),
        price: Number(product.price),
      };
    });

    return mappedProducts;
  }

  async getAll(): Promise<ProductDto[]> {
    const products = await this.prismaService.product.findMany({
      omit: {
        restaurantId: true,
      },
    });

    const mappedProducts: ProductDto[] = products.map((product) => {
      return {
        ...product,
        id: Number(product.id),
        price: Number(product.price),
      };
    });

    return mappedProducts;
  }

  async update(id: number, body: UpdateProductDto) {
    try {
      await this.prismaService.product.update({
        where: {
          id: id,
        },
        data: {
          name: body.name,
          description: body.description,
          price: body.price,
          stockCount: body.stockCount,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  async toggle(id: number, isAvailable: boolean) {
    try {
      await this.prismaService.product.update({
        where: {
          id: id,
        },
        data: {
          isAvailable: isAvailable,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  async linkToCategory(body: LinkProductCategoryDto) {
    try {
      await this.prismaService.productCategory.create({
        data: {
          idProduct: body.idProduct,
          idCategory: body.idCategory,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  async linkExists(body: LinkProductCategoryDto) {
    const linkAlreadyExists =
      await this.prismaService.productCategory.findFirst({
        where: {
          idProduct: body.idProduct,
          idCategory: body.idCategory,
        },
      });

    return linkAlreadyExists !== null;
  }

  async amountIsAvailable(id: number, amount: number): Promise<boolean | null> {
    const product = await this.prismaService.product.findFirst({
      where: {
        id: id,
      },
      select: {
        stockCount: true,
      },
    });

    if (product === null) return product;

    return product.stockCount >= amount;
  }

  async existsByIds(ids: number[]): Promise<boolean> {
    const productIds = await this.prismaService.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
      },
    });

    return ids.length === productIds.length;
  }

  async someStockIsOutOrRange(items: ProductWithStockDto[]): Promise<boolean> {
    const productIds = items.map((item) => item.id);

    const productsWithStock = await this.prismaService.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        stockCount: true,
      },
    });

    if (productIds.length !== productsWithStock.length) return false;

    return productsWithStock.some(
      (productWithStock) =>
        items.find((item) => item.id == Number(productWithStock.id))!
          .stockCount > productWithStock.stockCount,
    );
  }

  async getPricesByIds(ids: number[]): Promise<ProductWithPriceDto[]> {
    const productsWithPrices = await this.prismaService.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    const mappedProductsWithPrices: ProductWithPriceDto[] =
      productsWithPrices.map((product) => {
        return {
          id: Number(product.id),
          price: Number(product.price),
        };
      });

    return mappedProductsWithPrices;
  }
}
