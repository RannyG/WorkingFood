import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../database/prisma/prisma.module';
import { CostumerModule } from './costumer/costumer.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [PrismaModule, CostumerModule, RestaurantModule],
})
export class UsersModule {}
