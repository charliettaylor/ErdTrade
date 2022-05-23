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

  /**
   * Takes a plain text password and a hashed password, and returns true if the plain text password
   * matches the hashed password
   * @param {string} value - The value to be hashed.
   * @param {string} hashedValue - The hashed value that you want to compare against.
   * @returns A boolean value.
   */
  async validateHash(value: string, hashedValue: string): Promise<boolean> {
    const valid = await compare(value, hashedValue);
    if (!valid) {
      throw new Error();
    }
    return valid;
  }

  /**
   * Takes a string, hashes it, and returns the hashed string
   * @param {string} value - The value to be hashed.
   * @returns The hashed password.
   */
  async hash(value: string): Promise<string> {
    return await hash(value, this.bcryptSaltRounds);
  }
}
