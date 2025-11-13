import { Module } from '@nestjs/common';
import { CostumerController } from './costumer.controller';
import { CostumerService } from './costumer.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { CostumerRepository } from './costumer.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
  controllers: [CostumerController],
  providers: [
    CostumerService,
    CostumerRepository,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  imports: [PrismaModule],
  exports: [CostumerService],
})
export class CostumerModule {}
