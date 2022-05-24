import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Shields, Prisma } from '@prisma/client';

@Injectable()
export class ShieldsService {
  constructor(private readonly prisma: PrismaService) {}

  async shield(
    shieldsWhereUniqueInput: Prisma.ShieldsWhereUniqueInput,
  ): Promise<Shields | null> {
    return this.prisma.shields.findUnique({
      where: shieldsWhereUniqueInput,
    });
  }

  async shields(params: Prisma.ShieldsFindManyArgs): Promise<Shields[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shields.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createShields(data: Prisma.ShieldsCreateInput): Promise<Shields> {
    return this.prisma.shields.create({
      data,
    });
  }

  async updateShields(params: {
    where: Prisma.ShieldsWhereUniqueInput;
    data: Prisma.ShieldsUpdateInput;
  }): Promise<Shields> {
    const { where, data } = params;
    return this.prisma.shields.update({
      data,
      where,
    });
  }

  async deleteShields(where: Prisma.ShieldsWhereUniqueInput): Promise<Shields> {
    return this.prisma.shields.delete({
      where,
    });
  }
}
