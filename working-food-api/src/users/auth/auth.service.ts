import { BadRequestException, Injectable } from '@nestjs/common';
import { CostumerService } from '../costumer/costumer.service';
import { RestaurantService } from '../restaurant/restaurant.service';
import {
  clearCpfCnpj,
  isCpf,
  isValidCpfOrCnpj,
} from 'src/core/helpers/cpf-cnpj-tools';
import { validatePassword } from 'src/core/helpers/password-tools';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './models/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private costumerService: CostumerService,
    private restaurantService: RestaurantService,
    private jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const clearedCpfCnpj = clearCpfCnpj(body.cpfCnpj);
    if (!isValidCpfOrCnpj(clearedCpfCnpj))
      throw new BadRequestException('Cpf ou Cnpj Inválido.');

    const userInformations = isCpf(clearedCpfCnpj)
      ? await this.costumerService.findByCpf(clearedCpfCnpj)
      : await this.restaurantService.findByCnpj(clearedCpfCnpj);

    if (!(await validatePassword(body.password, userInformations.password)))
      throw new BadRequestException('Cpf/Cnpj ou senha estão incorretos.');

    const payload = {
      sub: userInformations.id,
      username: userInformations.name,
      role: userInformations.role,
    };

    return await this.jwtService.signAsync(payload);
  }
}
