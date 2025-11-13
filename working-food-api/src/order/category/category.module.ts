import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { CategoryRepository } from './category.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/users/auth/auth.guard';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  imports: [PrismaModule],
  exports: [CategoryService],
})
export class CategoryModule {}
