import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  /**
   * If the request is authenticated, return true, otherwise return false.
   * @param {ExecutionContext} context - ExecutionContext - This is the context of the request.
   * @returns A boolean value.
   */
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
