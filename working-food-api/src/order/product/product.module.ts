import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { RestaurantModule } from 'src/users/restaurant/restaurant.module';
import { CategoryModule } from '../category/category.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  imports: [PrismaModule, RestaurantModule, CategoryModule],
  exports: [ProductService],
})
export class ProductModule {}
