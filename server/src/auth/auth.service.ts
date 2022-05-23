import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { EncryptionService } from './encryption.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  /**
   * Takes an email and a plain text password, and returns a user if the email and password are
   * valid
   * @param {string} email - The email address of the user.
   * @param {string} plainTextPassword - The password that the user entered in the login form.
   * @returns A user object
   */
  async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      await this.encryptionService.validateHash(
        plainTextPassword,
        user.password,
      );
      return user;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  /**
   * Takes a payload of type Prisma.UserCreateInput, hashes the password, creates a new user, and
   * returns the user with a hashed password.
   * @param payload - Prisma.UserCreateInput
   * @returns User
   */
  async registerUser(payload: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await this.encryptionService.hash(payload.password);
    payload.password = hashedPassword;

    try {
      const user = await this.prismaService.user.create({
        data: { ...payload },
      });
      return user;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e?.code === 'P2002'
      ) {
        throw new ConflictException();
      }
      throw new InternalServerErrorException(e);
    }
  }
}
