import { Injectable } from '@nestjs/common';

import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
  private get bcryptSaltRounds(): string | number {
    const saltOrRounds = 8; // Should be stored in environment variable somewhere.

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds;
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds);
  }
}
