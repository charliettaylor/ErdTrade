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
    const valid = await compare(value, hashedValue);
    if (!valid) {
      throw new Error();
    }
    return valid;
  }

  async hash(value: string): Promise<string> {
    return await hash(value, this.bcryptSaltRounds);
  }
}
