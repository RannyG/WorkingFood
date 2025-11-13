import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateRestaurantDto } from './models/create-restaurant.dto';
import { Role } from 'generated/prisma';
import { UserWithPasswordDto } from '../models/user-with-password.dto';
import { generateHash } from 'src/core/helpers/password-tools';

@Injectable()
export class RestaurantRepository {
  constructor(private prismaService: PrismaService) {}

  async create(body: CreateRestaurantDto) {
    const encryptedPassword = await generateHash(body.password);

    try {
      await this.prismaService.restaurant.create({
        data: {
          user: {
            create: {
              role: Role.RESTAURANT,
              password: encryptedPassword,
            },
          },
          companyName: body.companyName,
          cnpj: body.cnpj
        },
      });

      return true;
    } catch(err:any) {
      console.log(err)
      return false;
    }
  }

  async existsByCnpj(cnpj: string) {
    const restaurantAlreadyExists =
      await this.prismaService.restaurant.findFirst({
        where: {
          cnpj: cnpj,
        },
      });

    return restaurantAlreadyExists !== null;
  }

  async findById(id: number) {
    const restaurantAlreadyExists =
      await this.prismaService.restaurant.findFirst({
        where: {
          id: id,
        },
      });

    return restaurantAlreadyExists !== null;
  }

  async findByCnpj(cnpj: string): Promise<UserWithPasswordDto | null> {
    const restaurant = await this.prismaService.restaurant.findFirst({
      where: {
        cnpj: cnpj,
      },
      select: {
        id: true,
        companyName: true,
        user: {
          select: {
            password: true,
            role: true,
          },
        },
      },
    });

    if (restaurant === null) return restaurant;

    const mappedRestaurant: UserWithPasswordDto = {
      id: Number(restaurant.id),
      name: restaurant.companyName,
      role: restaurant.user.role,
      password: restaurant.user.password,
    };

    return mappedRestaurant;
  }
}
