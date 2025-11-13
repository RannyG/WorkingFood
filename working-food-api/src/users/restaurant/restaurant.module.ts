import { Module } from '@nestjs/common';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { RestaurantRepository } from './restaurant.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    RestaurantRepository,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  imports: [PrismaModule],
  exports: [RestaurantService],
})
export class RestaurantModule {}
