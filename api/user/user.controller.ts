import { Controller, Get, Param, Post } from '@nestjs/common';
import UserService from './user.service';
import { ApiParam, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('User')
@Controller('/user')
export default class UserController {
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
  public getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
