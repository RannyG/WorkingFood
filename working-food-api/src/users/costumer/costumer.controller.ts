import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CostumerService } from './costumer.service';
import type { CreateCostumerDto } from './models/create-costumer.dto';
import { Public } from 'src/core/annotation/public.annotation';

@Controller('costumer')
export class CostumerController {
  constructor(private costumerService: CostumerService) {}

  @HttpCode(201)
  @HttpCode(400)
  @Post()
  @Public()
  create(@Body() body: CreateCostumerDto) {
    return this.costumerService.create(body);
  }
}
