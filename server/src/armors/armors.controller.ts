import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArmorsService } from './armors.service';
import {
  ApiParam,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Armors')
@Controller('/armors')
export class ArmorsController {
  constructor(private readonly armorsService: ArmorsService) {}

  @ApiOperation({ summary: 'Get Armors By ID' })
  @ApiResponse({ status: 200, description: 'Returns specified armors' })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of a armors',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/:id')
  public getArmorsById(@Param('id') id: string) {
    return this.armorsService.armor({ id });
  }

  @ApiOperation({ summary: 'Search Armors' })
  @ApiResponse({ status: 200, description: 'Returns specified armors' })
  @ApiQuery({
    name: 'search',
    description: 'Enter name of armor to search for',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/')
  public searchArmors(@Query('query') query: string) {
    return this.armorsService.armors({ where: { name: query } });
  }
}
