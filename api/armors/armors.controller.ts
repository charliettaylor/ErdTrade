import { Controller, Get, Param } from '@nestjs/common';
import { ArmorsService } from './armors.service';
import { ApiParam, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Armors')
@Controller('/Armors')
export class ArmorsController {
  constructor(private readonly armorsService: ArmorsService) {}

  @ApiOperation({ summary: 'Get Armors By ID' })
  @ApiResponse({ status: 200, description: 'Returns specified Armors' })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of a Armors',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/:id')
  public getArmorsById(@Param('id') id: string) {
    return this.armorsService.Armor({ id });
  }
}
