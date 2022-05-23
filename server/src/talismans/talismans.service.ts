import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Talismans, Prisma } from '@prisma/client';

@Injectable()
export class TalismansService {
  constructor(private readonly prisma: PrismaService) {}

  async talisman(
    talismansWhereUniqueInput: Prisma.TalismansWhereUniqueInput,
  ): Promise<Talismans | null> {
    return this.prisma.talismans.findUnique({
      where: talismansWhereUniqueInput,
    });
  }

  async talismans(params: Prisma.TalismansFindManyArgs): Promise<Talismans[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.talismans.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTalismans(data: Prisma.TalismansCreateInput): Promise<Talismans> {
    return this.prisma.talismans.create({
      data,
    });
  }

  async updateTalismans(params: {
    where: Prisma.TalismansWhereUniqueInput;
    data: Prisma.TalismansUpdateInput;
  }): Promise<Talismans> {
    const { where, data } = params;
    return this.prisma.talismans.update({
      data,
      where,
    });
  }

  async deleteTalismans(
    where: Prisma.TalismansWhereUniqueInput,
  ): Promise<Talismans> {
    return this.prisma.talismans.delete({
      where,
    });
  }
}
