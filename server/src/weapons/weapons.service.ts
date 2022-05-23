import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Weapons, Prisma } from '@prisma/client';

@Injectable()
export class WeaponsService {
  constructor(private readonly prisma: PrismaService) {}

  async weapon(
    weaponsWhereUniqueInput: Prisma.WeaponsWhereUniqueInput,
  ): Promise<Weapons | null> {
    return this.prisma.weapons.findUnique({
      where: weaponsWhereUniqueInput,
    });
  }

  async weapons(params: Prisma.WeaponsFindManyArgs): Promise<Weapons[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.weapons.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createWeapons(data: Prisma.WeaponsCreateInput): Promise<Weapons> {
    return this.prisma.weapons.create({
      data,
    });
  }

  async updateWeapons(params: {
    where: Prisma.WeaponsWhereUniqueInput;
    data: Prisma.WeaponsUpdateInput;
  }): Promise<Weapons> {
    const { where, data } = params;
    return this.prisma.weapons.update({
      data,
      where,
    });
  }

  async deleteWeapons(where: Prisma.WeaponsWhereUniqueInput): Promise<Weapons> {
    return this.prisma.weapons.delete({
      where,
    });
  }
}
