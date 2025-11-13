import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import type { CreateProductDto } from './models/create-product.dto';
import { ProductService } from './product.service';
import type { UpdateProductDto } from './models/update-product.dto';
import type { LinkProductCategoryDto } from './models/link-product-category.dto';
import { Public } from 'src/core/annotation/public.annotation';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.productService.getById(id);
  }

  @Public()
  @Get('')
  getAll() {
    return this.productService.getAll();
  }

  @Get('/restaurant/:id')
  getByRestaurantId(@Param('id') id: number) {
    return this.productService.getByRestaurantId(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return this.productService.update(id, body);
  }

  @Patch('/toggle/:id')
  toggle(
    @Param('id') id: number,
    @Query('isAvailable', ParseBoolPipe) isAvailable: boolean,
  ) {
    return this.productService.toggle(id, isAvailable);
  }

  @Post('/category')
  linkToCategory(@Body() body: LinkProductCategoryDto) {
    return this.productService.linkToCategory(body);
  }
}
