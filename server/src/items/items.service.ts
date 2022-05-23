import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Items, Prisma } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async item(
    itemsWhereUniqueInput: Prisma.ItemsWhereUniqueInput,
  ): Promise<Items | null> {
    return this.prisma.items.findUnique({
      where: itemsWhereUniqueInput,
    });
  }

  async items(params: Prisma.ItemsFindManyArgs): Promise<Items[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.items.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createItems(data: Prisma.ItemsCreateInput): Promise<Items> {
    return this.prisma.items.create({
      data,
    });
  }

  async updateItems(params: {
    where: Prisma.ItemsWhereUniqueInput;
    data: Prisma.ItemsUpdateInput;
  }): Promise<Items> {
    const { where, data } = params;
    return this.prisma.items.update({
      data,
      where,
    });
  }

  async deleteItems(where: Prisma.ItemsWhereUniqueInput): Promise<Items> {
    return this.prisma.items.delete({
      where,
    });
  }
}
