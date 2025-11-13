import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CostumerModule } from '../costumer/costumer.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [
    CostumerModule,
    RestaurantModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1Y' },
    }),
  ],
})
export class AuthModule {}
