import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/core/annotation/public.annotation';
import { AddressService } from './address.service';
import { AddressDto } from './models/address.dto';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Public()
  @Get(':cep')
  getAddressByCep(@Param('cep') cep: string): Promise<AddressDto> {
    return this.addressService.getAddressByCep(cep);
  }
}
