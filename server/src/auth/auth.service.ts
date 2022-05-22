import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenDto, TokenCookies, TokenResponse } from './auth.dto';
import * as CONSTANTS from '../common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async noTokenLogin(username: string, pass: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    const validPassword = this.passwordService.validatePassword(
      pass,
      user.password,
    );
    if (user && validPassword) {
      const { email, username, id } = user;
      const tokens = this.generateTokens({ email, username, id });
      const cookies = this.cookifyTokens(tokens);
      return cookies;
    }
    return null;
  }

  async registerUser(payload: Prisma.UserCreateInput): Promise<TokenCookies> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password,
    );

    try {
      const { username, email, id } = await this.prismaService.user.create({
        data: { password: hashedPassword, ...payload },
      });
      const tokens = this.generateTokens({ username, email, id });
      return this.cookifyTokens(tokens);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException();
      }
    }
    return null;
  }

  private generateTokens(payload: GenerateTokenDto): TokenResponse {
    const accessToken = this.jwtService.sign(payload, {
      secret: CONSTANTS.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: CONSTANTS.JWT_REFRESH_TOKEN_EXPIRY,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: CONSTANTS.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: CONSTANTS.JWT_REFRESH_TOKEN_EXPIRY,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private cookifyTokens(tokens: TokenResponse): TokenCookies {
    return {
      atc: `Authentication=${tokens.access_token}; HttpOnly; Path=/; Max-Age=${CONSTANTS.JWT_ACCESS_TOKEN_EXPIRY}`,
      rtc: `Refresh=${tokens.refresh_token}; HttpOnly; Path=/; Max-Age=${CONSTANTS.JWT_REFRESH_TOKEN_EXPIRY}`,
    };
  }
}
