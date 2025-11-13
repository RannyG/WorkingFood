import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './users/auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './users/auth/auth.guard';

@Module({
  imports: [AuthModule, UsersModule, OrderModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
