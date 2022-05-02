import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserService {
  public getUser(id: string): string {
    return id;
  }
}
