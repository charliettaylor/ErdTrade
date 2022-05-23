import { Controller, Get, Param } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { ApiParam, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Weapons } from '@prisma/client';

@ApiTags('Weapons')
@Controller('/weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @ApiOperation({ summary: 'Get Weapons By ID' })
  @ApiResponse({ status: 200, description: 'Returns specified weapons' })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of a weapons',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/:id')
  public getWeaponsById(@Param('id') id: string) {
    return this.weaponsService.weapon({ id: id });
  }

  @ApiOperation({ summary: 'Search Weapons' })
  @ApiResponse({ status: 200, description: 'Returns specified weapons' })
  @ApiParam({
    name: 'searchString',
    description: 'String to search for weapons with',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/search/:searchString')
  async searchWeapons(
    @Param('searchString') searchString: string,
  ): Promise<Weapons[]> {
    return this.weaponsService.weapons({
      where: {
        OR: [
          { name: { contains: searchString, mode: 'insensitive' } },
          { description: { contains: searchString, mode: 'insensitive' } },
        ],
      },
    });
  }
}
