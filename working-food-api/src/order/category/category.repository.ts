import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateCategoryDto } from './models/create-category.dto';
import { UpdateCategoryDto } from './models/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private prismaService: PrismaService) {}

  async create(body: CreateCategoryDto): Promise<boolean> {
    try {
      await this.prismaService.category.create({
        data: {
          name: body.name,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  async existsByName(name: string): Promise<boolean> {
    const categoryAlreadyExists = await this.prismaService.category.findFirst({
      where: {
        name: name,
      },
    });

    return categoryAlreadyExists !== null;
  }

  async existsById(id: number): Promise<boolean> {
    const categoryAlreadyExists = await this.prismaService.category.findFirst({
      where: {
        id: id,
      },
    });

    return categoryAlreadyExists !== null;
  }

  async update(id: number, body: UpdateCategoryDto): Promise<boolean> {
    try {
      await this.prismaService.category.update({
        where: {
          id: id,
        },
        data: {
          name: body.name,
        },
      });

      return true;
    } catch {
      return false;
    }
  }
}
