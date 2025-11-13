import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { CostumerModule } from 'src/users/costumer/costumer.module';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/users/auth/auth.guard';
import { AddressModule } from './address/address.module';

@Module({
  imports: [CartModule, CategoryModule, ProductModule, CostumerModule, AddressModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    PrismaService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class OrderModule {}
