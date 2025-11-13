import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './models/create-product.dto';
import { ProductDto } from './models/product.dto';
import { UpdateProductDto } from './models/update-product.dto';
import { RestaurantService } from 'src/users/restaurant/restaurant.service';
import { LinkProductCategoryDto } from './models/link-product-category.dto';
import { CategoryService } from '../category/category.service';
import { ProductWithCategory } from './models/product-with-category.dto';
import { ProductWithStockDto } from './models/product-with-stock.dto';
import { ProductWithPriceDto } from './models/product-with-price.dto';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private restaurantService: RestaurantService,
    private categoryService: CategoryService,
  ) {}

  async create(body: CreateProductDto) {
    if (!(await this.restaurantService.findById(body.idRestaurant)))
      throw new NotFoundException('Não foi possível encontrar o restaurante');

    if (await this.productRepository.findByName(body.name))
      throw new BadRequestException(
        `Já existe um produto com o nome: ${body.name}`,
      );

    return await this.productRepository.create(body);
  }

  getAll(): Promise<ProductDto[]> {
    return this.productRepository.getAll();
  }

  getByRestaurantId(restaurantId: number): Promise<ProductDto[]> {
    return this.productRepository.getByRestaurantId(restaurantId);
  }

  async getById(id: number): Promise<ProductWithCategory | null> {
    const foundProduct = await this.productRepository.findById(id);

    if (foundProduct === null)
      throw new NotFoundException('Não foi possível encontrar o produto.');

    return foundProduct;
  }

  async update(id: number, body: UpdateProductDto) {
    if (!(await this.productRepository.existsById(id)))
      throw new NotFoundException('Não foi possível encontrar o produto.');

    return await this.productRepository.update(id, body);
  }

  async toggle(id: number, isAvailable: boolean) {
    if (!(await this.productRepository.existsById(id)))
      throw new NotFoundException('Não foi possível encontrar o produto.');

    return await this.productRepository.toggle(id, isAvailable);
  }

  async linkToCategory(body: LinkProductCategoryDto) {
    if (!(await this.productRepository.existsById(body.idProduct)))
      throw new NotFoundException('Não foi possível encontrar o produto.');

    if (!(await this.categoryService.existsById(body.idCategory)))
      throw new NotFoundException('Não foi possivel encontrar a categoria.');

    if (await this.productRepository.linkExists(body))
      throw new BadRequestException(
        'Esse produto já possui a categoria selecionada.',
      );

    return await this.productRepository.linkToCategory(body);
  }

  amountIsAvailable(id: number, amount: number) {
    return this.productRepository.amountIsAvailable(id, amount);
  }

  existsByIds(ids: number[]): Promise<boolean> {
    return this.productRepository.existsByIds(ids);
  }

  someStockIsOutOrRange(items: ProductWithStockDto[]): Promise<boolean> {
    return this.productRepository.someStockIsOutOrRange(items);
  }

  getPricesByIds(ids: number[]): Promise<ProductWithPriceDto[]> {
    return this.productRepository.getPricesByIds(ids);
  }
}
