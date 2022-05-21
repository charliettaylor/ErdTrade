import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registerUser(payload: Prisma.UserCreateInput): Promise<any> {
    const user = await this.prismaService.user.create({ data: payload });
    return user;
  }
}
