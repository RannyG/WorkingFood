import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
