import { Controller, Get, Param } from '@nestjs/common';
import { TalismansService } from './talismans.service';
import { ApiParam, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Talismans } from '@prisma/client';

@ApiTags('Talismans')
@Controller('/talismans')
export class TalismansController {
  constructor(private readonly talismansService: TalismansService) {}

  @ApiOperation({ summary: 'Get Talismans By ID' })
  @ApiResponse({ status: 200, description: 'Returns specified talismans' })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of a talismans',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/:id')
  public getTalismansById(@Param('id') id: string) {
    return this.talismansService.talisman({ id: id });
  }

  @ApiOperation({ summary: 'Search Talismans' })
  @ApiResponse({ status: 200, description: 'Returns specified talismans' })
  @ApiParam({
    name: 'searchString',
    description: 'String to search for talismans with',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/search/:searchString')
  async searchTalismans(
    @Param('searchString') searchString: string,
  ): Promise<Talismans[]> {
    return this.talismansService.talismans({
      where: {
        OR: [
          { name: { contains: searchString, mode: 'insensitive' } },
          { description: { contains: searchString, mode: 'insensitive' } },
        ],
      },
    });
  }
}
