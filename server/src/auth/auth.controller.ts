import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  Req,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';
import { CookieAuthGuard } from './cookieAuth.guard';
import { LogInWithCredentialsGuard } from './logInWithCredentials.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a user' })
  @ApiResponse({
    status: 201,
    description: 'Returns a successfully created code for the user',
  })
  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    return this.authService.registerUser(payload);
  }

  @ApiOperation({ summary: 'Login as a user' })
  @ApiResponse({
    status: 200,
    description: 'Returns a session if the credentials are valid',
  })
  @UseGuards(LogInWithCredentialsGuard)
  @Post('/login')
  async logIn(@Req() request) {
    return request.user;
  }

  @ApiOperation({ summary: 'Logout a user' })
  @ApiResponse({ status: 200, description: 'Removes the current session.' })
  @UseGuards(CookieAuthGuard)
  @Post('/logout')
  async logOut(@Req() request) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }

  @ApiOperation({ summary: 'Ensure a user has a current and valid session.' })
  @ApiResponse({
    status: 200,
    description: 'User has a valid session',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: no valid session.',
  })
  @UseGuards(CookieAuthGuard)
  @Get('/authenticate')
  async authenticate(@Req() request) {
    return request.user;
  }
}
