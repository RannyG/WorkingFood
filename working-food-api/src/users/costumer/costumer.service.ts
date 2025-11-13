import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCostumerDto } from './models/create-costumer.dto';
import { CostumerRepository } from './costumer.repository';
import { UserWithPasswordDto } from '../models/user-with-password.dto';

@Injectable()
export class CostumerService {
  constructor(private costumerRepository: CostumerRepository) {}

  async create(body: CreateCostumerDto): Promise<boolean> {
    if (await this.costumerRepository.existsByCpf(body.cpf)) {
      throw new BadRequestException(
        'Já existe um cliente cadastrado neste CPF.',
      );
    }

    return await this.costumerRepository.create(body);
  }

  existsById(id: number): Promise<boolean> {
    return this.costumerRepository.existsById(id);
  }

  async findByCpf(cpf: string): Promise<UserWithPasswordDto> {
    const foundCostumer = await this.costumerRepository.findByCpf(cpf);

    if (foundCostumer === null)
      throw new BadRequestException('Cpf/Cnpj ou senha estão incorretos.');

    return foundCostumer;
  }
}
