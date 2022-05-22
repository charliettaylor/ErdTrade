import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LogInWithCredentialsGuard extends AuthGuard('local') {
  /**
   * The function is called by NestJS when a user tries to access a route that is protected by the
   * JwtAuthGuard.
   * The function calls the super.canActivate() function which returns a boolean value.
   * The function then calls the super.logIn() function which logs the user in.
   * The function then returns the boolean value that was returned by the super.canActivate() function.
   * The super.canActivate() function is defined in the AuthGuard class.
   * The super.logIn() function is defined in the JwtAuthGuard class.
   * The super.canActivate() function returns true if the user is logged in.
   * The super.logIn() function logs the user in.
   * The super.logIn() function is called by the super.canActivate() function.
   * @param {ExecutionContext} context - ExecutionContext - This is the context of the request.
   * @returns A boolean value.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    return result;
  }
}
