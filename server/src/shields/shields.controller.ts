import { Controller, Get, Param } from '@nestjs/common';
import { ShieldsService } from './shields.service';
import { ApiParam, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Shields } from '@prisma/client';

@ApiTags('Shields')
@Controller('/shields')
export class ShieldsController {
  constructor(private readonly shieldsService: ShieldsService) {}

  @ApiOperation({ summary: 'Get Shields By ID' })
  @ApiResponse({ status: 200, description: 'Returns specified shields' })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of a shields',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/:id')
  public getShieldsById(@Param('id') id: string) {
    return this.shieldsService.shield({ id: id });
  }

  @ApiOperation({ summary: 'Search Shields' })
  @ApiResponse({ status: 200, description: 'Returns specified shields' })
  @ApiParam({
    name: 'searchString',
    description: 'String to search for shields with',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/search/:searchString')
  async searchShields(
    @Param('searchString') searchString: string,
  ): Promise<Shields[]> {
    return this.shieldsService.shields({
      where: {
        OR: [
          { name: { contains: searchString, mode: 'insensitive' } },
          { description: { contains: searchString, mode: 'insensitive' } },
        ],
      },
    });
  }
}
