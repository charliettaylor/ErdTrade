import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ApiParam, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Items } from '@prisma/client';

@ApiTags('Items')
@Controller('/items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOperation({ summary: 'Get Items By ID' })
  @ApiResponse({ status: 200, description: 'Returns specified items' })
  @ApiParam({
    name: 'id',
    description: 'Unique ID of a items',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/:id')
  public getItemsById(@Param('id') id: string) {
    return this.itemsService.item({ id: id });
  }

  @ApiOperation({ summary: 'Search Items' })
  @ApiResponse({ status: 200, description: 'Returns specified items' })
  @ApiParam({
    name: 'searchString',
    description: 'String to search for items with',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/search/:searchString')
  async searchItems(
    @Param('searchString') searchString: string,
  ): Promise<Items[]> {
    return this.itemsService.items({
      where: {
        OR: [
          { name: { contains: searchString, mode: 'insensitive' } },
          { description: { contains: searchString, mode: 'insensitive' } },
        ],
      },
    });
  }
}
