import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Ammos, Prisma } from '@prisma/client';

@Injectable()
export class AmmosService {
  constructor(private readonly prisma: PrismaService) {}

  async ammo(
    ammosWhereUniqueInput: Prisma.AmmosWhereUniqueInput,
  ): Promise<Ammos | null> {
    return this.prisma.ammos.findUnique({
      where: ammosWhereUniqueInput,
    });
  }

  async ammos(params: Prisma.AmmosFindManyArgs): Promise<Ammos[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ammos.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAmmos(data: Prisma.AmmosCreateInput): Promise<Ammos> {
    return this.prisma.ammos.create({
      data,
    });
  }

  async updateAmmos(params: {
    where: Prisma.AmmosWhereUniqueInput;
    data: Prisma.AmmosUpdateInput;
  }): Promise<Ammos> {
    const { where, data } = params;
    return this.prisma.ammos.update({
      data,
      where,
    });
  }

  async deleteAmmos(where: Prisma.AmmosWhereUniqueInput): Promise<Ammos> {
    return this.prisma.ammos.delete({
      where,
    });
  }
}
