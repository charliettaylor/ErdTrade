import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Armors, Prisma } from '@prisma/client';

@Injectable()
export class ArmorsService {
  constructor(private prisma: PrismaService) {}

  async Armor(ArmorsWhereUniqueInput: Prisma.ArmorsWhereUniqueInput): Promise<Armors | null> {
    return this.prisma.armors.findUnique({
      where: ArmorsWhereUniqueInput,
    });
  }

  async Armors(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ArmorsWhereUniqueInput;
    where?: Prisma.ArmorsWhereInput;
    orderBy?: Prisma.ArmorsOrderByWithRelationInput;
  }): Promise<Armors[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.armors.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createArmors(data: Prisma.ArmorsCreateInput): Promise<Armors> {
    return this.prisma.armors.create({
      data,
    });
  }

  async updateArmors(params: {
    where: Prisma.ArmorsWhereUniqueInput;
    data: Prisma.ArmorsUpdateInput;
  }): Promise<Armors> {
    const { where, data } = params;
    return this.prisma.armors.update({
      data,
      where,
    });
  }

  async deleteArmors(where: Prisma.ArmorsWhereUniqueInput): Promise<Armors> {
    return this.prisma.armors.delete({
      where,
    });
  }
}
