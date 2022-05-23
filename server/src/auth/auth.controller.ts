import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  Req,
  Get,
} from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { CookieAuthGuard } from './cookieAuth.guard';
import { LogInWithCredentialsGuard } from './logInWithCredentials.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    return this.authService.registerUser(payload);
  }

  @HttpCode(200)
  @UseGuards(LogInWithCredentialsGuard)
  @Post('/login')
  async logIn(@Req() request) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthGuard)
  @Post('/logout')
  async logOut(@Req() request) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthGuard)
  @Get('/authenticate')
  async authenticate(@Req() request) {
    return request.user;
  }
}
