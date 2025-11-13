import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './models/create-category.dto';
import { UpdateCategoryDto } from './models/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(body: CreateCategoryDto) {
    if (await this.categoryRepository.existsByName(body.name))
      return new BadRequestException('Já existe uma categoria com esse nome');

    return await this.categoryRepository.create(body);
  }

  async update(id: number, body: UpdateCategoryDto) {
    if (!(await this.categoryRepository.existsById(id)))
      return new NotFoundException(
        'Não foi possível encontrar uma categoria com esse nome',
      );

    if (await this.categoryRepository.existsByName(body.name))
      return new BadRequestException('Já existe uma categoria com esse nome');

    return await this.categoryRepository.update(id, body);
  }

  existsById(id: number) {
    return this.categoryRepository.existsById(id);
  }
}
