import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ViacepDto } from './models/external/viacep.dto';
import { AddressDto } from './models/address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly httpService: HttpService) {}

  async getAddressByCep(cep: string): Promise<AddressDto> {
    const apiUrl = process.env.VIA_CEP_API_URL;

    if (!apiUrl) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao consultar o endereço.',
      );
    }

    const formattedUrl: string = apiUrl.replace('{{CEP}}', cep);

    const response = (
      await lastValueFrom(this.httpService.get<ViacepDto>(formattedUrl))
    ).data;

    const formattedResponse: AddressDto = {
      cep: response.cep,
      streetName: response.logradouro,
      complement: response.complemento,
      neighborhood: response.bairro,
      state: response.uf,
    };

    return formattedResponse;
  }
}
