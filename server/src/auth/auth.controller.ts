import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() payload: RegisterDto, @Request() req) {
    const cookies = await this.authService.registerUser(payload);
    req.res.setHeader('Set-Cookie', [cookies.atc, cookies.rtc]);
    req.res.status(201).send();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
