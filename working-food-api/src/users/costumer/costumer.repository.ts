import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateCostumerDto } from './models/create-costumer.dto';
import { Role } from 'generated/prisma';
import { UserWithPasswordDto } from '../models/user-with-password.dto';
import { generateHash } from 'src/core/helpers/password-tools';

@Injectable()
export class CostumerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(body: CreateCostumerDto): Promise<boolean> {
    const encryptedPassword = await generateHash(body.password);
    try {
      await this.prismaService.costumer.create({
        data: {
          name: body.name,
          birthDate: body.birthDate,
          cellphone: body.cellphone,
          cpf: body.cpf,
          user: {
            create: {
              role: Role.COSTUMER,
              password: encryptedPassword,
            },
          },
        },
      });

      return true;
    } catch(err:any) {
      console.log(err)
      return false;
    }
  }

  async existsByCpf(cpf: string): Promise<boolean> {
    const userAlreadyExists = await this.prismaService.costumer.findFirst({
      where: {
        cpf: cpf,
      },
    });

    return userAlreadyExists !== null;
  }

  async existsById(id: number): Promise<boolean> {
    const userAlreadyExists = await this.prismaService.costumer.findFirst({
      where: {
        id: id,
      },
    });

    return userAlreadyExists !== null;
  }

  async findByCpf(cpf: string): Promise<UserWithPasswordDto | null> {
    const costumer = await this.prismaService.costumer.findFirst({
      where: {
        cpf: cpf,
      },
      select: {
        id: true,
        name: true,
        user: {
          select: {
            password: true,
            role: true,
          },
        },
      },
    });

    if (costumer === null) return costumer;

    const mappedCostumer: UserWithPasswordDto = {
      id: Number(costumer.id),
      name: costumer.name,
      role: costumer.user.role,
      password: costumer.user.password,
    };

    return mappedCostumer;
  }
}
