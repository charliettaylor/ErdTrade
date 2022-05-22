import { Injectable } from '@nestjs/common';

import { hash, compare } from 'bcrypt';

@Injectable()
export class EncryptionService {
  private get bcryptSaltRounds(): string | number {
    const saltOrRounds = 8; // Should be stored in environment variable somewhere.

    return Number.isInteger(Number(saltOrRounds))
      ? Number(saltOrRounds)
      : saltOrRounds;
  }

  async validateHash(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }

  async hash(value: string): Promise<string> {
    return hash(value, this.bcryptSaltRounds);
  }
}
