import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Ashes, Prisma } from '@prisma/client';

@Injectable()
export class AshesService {
  constructor(private readonly prisma: PrismaService) {}

  async ash(
    ashesWhereUniqueInput: Prisma.AshesWhereUniqueInput,
  ): Promise<Ashes | null> {
    return this.prisma.ashes.findUnique({
      where: ashesWhereUniqueInput,
    });
  }

  async ashes(params: Prisma.AshesFindManyArgs): Promise<Ashes[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ashes.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAshes(data: Prisma.AshesCreateInput): Promise<Ashes> {
    return this.prisma.ashes.create({
      data,
    });
  }

  async updateAshes(params: {
    where: Prisma.AshesWhereUniqueInput;
    data: Prisma.AshesUpdateInput;
  }): Promise<Ashes> {
    const { where, data } = params;
    return this.prisma.ashes.update({
      data,
      where,
    });
  }

  async deleteAshes(where: Prisma.AshesWhereUniqueInput): Promise<Ashes> {
    return this.prisma.ashes.delete({
      where,
    });
  }
}
