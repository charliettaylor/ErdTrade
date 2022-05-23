import { Controller, Get, Param } from '@nestjs/common';
import { AmmosService } from './ammos.service';
import { ApiParam, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Ammos } from '@prisma/client';

@ApiTags('Ammos')
@Controller('/ammos')
export class AmmosController {
  constructor(private readonly ammosService: AmmosService) {}

  @ApiOperation({ summary: 'Get Ammos By ID' })
  @ApiResponse({ status: 200, description: 'Returns specified ammos' })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of a ammos',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/:id')
  public getAmmosById(@Param('id') id: string) {
    return this.ammosService.ammo({ id: id });
  }

  @ApiOperation({ summary: 'Search Ammos' })
  @ApiResponse({ status: 200, description: 'Returns specified ammos' })
  @ApiParam({
    name: 'searchString',
    description: 'String to search for ammos with',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/search/:searchString')
  async searchAmmos(
    @Param('searchString') searchString: string,
  ): Promise<Ammos[]> {
    return this.ammosService.ammos({
      where: {
        OR: [
          { name: { contains: searchString, mode: 'insensitive' } },
          { description: { contains: searchString, mode: 'insensitive' } },
        ],
      },
    });
  }
}
