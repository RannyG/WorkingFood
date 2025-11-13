import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './models/create-restaurant.dto';
import { RestaurantRepository } from './restaurant.repository';
import { UserWithPasswordDto } from '../models/user-with-password.dto';

@Injectable()
export class RestaurantService {
  constructor(private restaurantRepository: RestaurantRepository) {}
  async create(body: CreateRestaurantDto) {
    if (await this.restaurantRepository.existsByCnpj(body.cnpj)) {
      throw new BadRequestException(
        'Já existe uma empresa cadastrada neste CNPJ.',
      );
    }

    return await this.restaurantRepository.create(body);
  }

  findById(id: number): Promise<boolean> {
    return this.restaurantRepository.findById(id);
  }

  async findByCnpj(cnpj: string): Promise<UserWithPasswordDto> {
    const foundRestaurant = await this.restaurantRepository.findByCnpj(cnpj);

    if (foundRestaurant === null)
      throw new BadRequestException('Cpf/Cnpj ou senha estão incorretos.');

    return foundRestaurant;
  }
}
