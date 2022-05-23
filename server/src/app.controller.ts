import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CookieAuthGuard } from './auth/cookieAuth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
   * Example of a protected route. We now have access to AuthGuards.
   * This particular one can tell if a user is logged in via examining cookies.
   */
  @Get('/protected')
  @UseGuards(CookieAuthGuard)
  protected(): string {
    return 'You are logged in!';
  }
}
