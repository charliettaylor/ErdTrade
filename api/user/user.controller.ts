import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiParam,
  ApiProperty,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { User } from '@prisma/client';

class CreateUserDto {
  @ApiProperty()
  username = 'string';

  @ApiProperty()
  email = 'string';

  @ApiProperty()
  password = 'string';
}

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get User By ID' })
  @ApiResponse({ status: 200, description: 'Returns specified user' })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of a user',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/:id')
  public getUserById(@Param('id') id: number) {
    return this.userService.user({ id });
  }

  @ApiOperation({ summary: 'Create New User' })
  @ApiResponse({ status: 200, description: 'Successfuly created user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Info about new user',
    required: true,
    isArray: false,
  })
  @Post()
  async signupUser(
    @Body() userData: { username: string; email: string; password: string }
  ): Promise<User> {
    return this.userService.createUser(userData);
  }
}
