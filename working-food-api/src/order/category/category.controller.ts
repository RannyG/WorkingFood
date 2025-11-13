import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import type { CreateCategoryDto } from './models/create-category.dto';
import { CategoryService } from './category.service';
import type { UpdateCategoryDto } from './models/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoryService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateCategoryDto) {
    return this.categoryService.update(id, body);
  }
}
