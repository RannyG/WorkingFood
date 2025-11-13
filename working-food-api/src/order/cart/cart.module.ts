import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { CartRepository } from './cart.repository';
import { ProductModule } from '../product/product.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    CartRepository,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  imports: [PrismaModule, ProductModule],
})
export class CartModule {}
