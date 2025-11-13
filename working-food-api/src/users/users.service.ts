import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserDto } from './models/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        role: true,
        costumer: {
          select: {
            name: true,
            cpf: true,
          },
        },
        restaurant: {
          select: {
            cnpj: true,
            companyName: true,
          },
        },
      },
    });

    const projectedUsers: UserDto[] = users.map((user) => {
      return {
        id: Number(user.id),
        name: user.costumer?.name ?? user.restaurant?.companyName ?? '',
        role: user.role,
        cpf: user.costumer?.cpf ?? null,
        cnpj: user.restaurant?.cnpj ?? null,
      };
    });

    return projectedUsers;
  }
}
