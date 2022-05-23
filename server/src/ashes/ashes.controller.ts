import { Controller, Get, Param } from '@nestjs/common';
import { AshesService } from './ashes.service';
import { ApiParam, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Ashes } from '@prisma/client';

@ApiTags('Ashes')
@Controller('/ashes')
export class AshesController {
  constructor(private readonly ashesService: AshesService) {}

  @ApiOperation({ summary: 'Get Ashes By ID' })
  @ApiResponse({ status: 200, description: 'Returns specified ashes' })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of a ashes',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/:id')
  public getAshesById(@Param('id') id: string) {
    return this.ashesService.ash({ id: id });
  }

  @ApiOperation({ summary: 'Search Ashes' })
  @ApiResponse({ status: 200, description: 'Returns specified ashes' })
  @ApiParam({
    name: 'searchString',
    description: 'String to search for ashes with',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/search/:searchString')
  async searchAshes(
    @Param('searchString') searchString: string,
  ): Promise<Ashes[]> {
    return this.ashesService.ashes({
      where: {
        OR: [
          { name: { contains: searchString, mode: 'insensitive' } },
          { description: { contains: searchString, mode: 'insensitive' } },
        ],
      },
    });
  }
}
