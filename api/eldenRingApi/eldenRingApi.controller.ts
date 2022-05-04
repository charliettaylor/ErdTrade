import { Controller, Get, Param, Query } from '@nestjs/common';
import { gql, GraphQLClient } from 'graphql-request';
import logging from '../utils/logging';
import { ApiParam, ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

const NAMESPACE = 'ERAPI';

@ApiTags('Elden Ring API')
@Controller()
export default class ERApiController {
  private client: GraphQLClient = new GraphQLClient('https://eldenring.fanapis.com/api/graphql');

  private searchQuery(route: string, name: string): string {
    return gql`
        query get {
            ${route}(search: "${name}") {
                id,
                name,
                image,
                description
            }
        }`;
  }

  private async makeSearchRequest(route: string, param: string) {
    try {
      logging.info(NAMESPACE, `Request made on ${route} for ${param}`);
      return await this.client.request(this.searchQuery(route, param));
    } catch (error) {
      logging.error(NAMESPACE, `Could not search for ${param} in ${route}`);
      return { error: `Could not search for ${param}` };
    }
  }

  private async makeIdRequest(route: string, query: string) {
    try {
      logging.info(NAMESPACE, `Request by ID made on ${route}`);
      return await this.client.request(query);
    } catch (error) {
      logging.error(NAMESPACE, `Could not get ${route} by ID`);
      return { error: `Could not find ${route} by ID` };
    }
  }

  @ApiOperation({ operationId: '/armors', summary: 'Query Armor' })
  @ApiQuery({
    name: 'name',
    description: 'Enter a search query for any armor.',
    type: String,
    required: true,
  })
  @Get('/armors')
  public async searchArmors(@Query('name') name: string) {
    const armor = await this.makeSearchRequest('armor', name);
    return armor;
  }

  @ApiOperation({ operationId: '/armors/:id', summary: 'Get Armor By ID' })
  @ApiResponse({ status: 200, description: 'Returns armor object based on ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter the Elden Ring API ID for armor',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/armors/:id')
  public async getArmorsById(@Param('id') id: string) {
    const query = gql`
        query get {
            armor(id: "${id}") {
                id,
                name,
                image,
                description,
                category,
                weight,
                dmgNegation{
                    name,
                    amount
                },
                resistance{
                    name,
                    amount
                }
            }
        }`;

    const armor = await this.makeIdRequest('armor', query);
    return armor;
  }

  @ApiOperation({ operationId: '/items', summary: 'Query Items' })
  @ApiQuery({
    name: 'name',
    description: 'Enter a search query for any item.',
    type: String,
    required: true,
  })
  @Get('/items')
  public async searchItem(@Query() name: string) {
    const item = await this.makeSearchRequest('item', name);
    return item;
  }

  @ApiOperation({ operationId: '/items/:id', summary: 'Get Item By ID' })
  @ApiResponse({ status: 200, description: 'Returns item object based on ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter the Elden Ring API ID for an item',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/items/:id')
  public async getItemById(@Param('id') id: string) {
    const query = gql`
        query get {
            item(id: "${id}") {
                id,
                name,
                image,
                description,
                type,
                effect
            }
        }`;

    const item = await this.makeIdRequest('item', query);
    return item;
  }

  @ApiOperation({ operationId: '/shields', summary: 'Query Shields' })
  @ApiQuery({
    name: 'name',
    description: 'Enter a search query for any shield.',
    type: String,
    required: true,
  })
  @Get('/shields')
  public async searchShields(@Query('name') name: string) {
    const shield = await this.makeSearchRequest('shield', name);
    return shield;
  }

  @ApiOperation({ operationId: '/shields/:id', summary: 'Get Shield By ID' })
  @ApiResponse({ status: 200, description: 'Returns shield object based on ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter the Elden Ring API ID for a shield',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/shields/:id')
  public async getShieldsById(@Param('id') id: string) {
    const query = gql`
        query get {
            shield(id: "${id}") {
                id,
                name,
                image,
                description,
                category,
                weight,
                attack{
                    name,
                    amount
                },
                defence{
                    name,
                    amount
                },
                requiredAttributes{
                    name,
                    amount
                },
                scalesWith{
                    name,
                    scaling
                }
            }
        }`;

    const shield = await this.makeIdRequest('shield', query);
    return shield;
  }

  @ApiOperation({ operationId: '/talismans', summary: 'Query Talismans' })
  @ApiQuery({
    name: 'name',
    description: 'Enter a search query for any talisman.',
    type: String,
    required: true,
  })
  @Get('/talismans')
  public async searchTalismans(@Query('name') name: string) {
    const talisman = await this.makeSearchRequest('talisman', name);
    return talisman;
  }

  @ApiOperation({ operationId: '/talismans/:id', summary: 'Get Talisman By ID' })
  @ApiResponse({ status: 200, description: 'Returns talisman object based on ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter the Elden Ring API ID for a talisman.',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/talismans/:id')
  public async getTalismansById(@Param('id') id: string) {
    const query = gql`
        query get {
            talisman(id: "${id}") {
                id,
                name,
                image,
                description,
                category,
                weight,
                attack{
                    name,
                    amount
                },
                defence{
                    name,
                    amount
                },
                requiredAttributes{
                    name,
                    amount
                },
                scalesWith{
                    name,
                    scaling
                }
            }
        }`;

    const talisman = await this.makeIdRequest('talisman', query);
    return talisman;
  }

  @ApiOperation({ operationId: '/weapons', summary: 'Query Weapons' })
  @ApiQuery({
    name: 'name',
    description: 'Enter a search query for any weapon.',
    type: String,
    required: true,
  })
  @Get('/weapons')
  public async searchWeapons(@Query('name') name: string) {
    const weapon = await this.makeSearchRequest('weapon', name);
    return weapon;
  }

  @ApiOperation({ operationId: '/weapons/:id', summary: 'Get Weapon By ID' })
  @ApiResponse({ status: 200, description: 'Returns weapon object based on ID' })
  @ApiParam({
    name: 'id',
    description: 'Enter the Elden Ring API ID for a weapon',
    allowEmptyValue: false,
    required: true,
  })
  @Get('/weapons/:id')
  public async getWeaponsById(@Param('id') id: string) {
    const query = gql`
        query get {
            weapon(id: "${id}") {
                id,
                name,
                image,
                description,
                category,
                weight,
                attack{
                    name,
                    amount
                },
                defence{
                    name,
                    amount
                },
                requiredAttributes{
                    name,
                    amount
                },
                scalesWith{
                    name,
                    scaling
                }
            }
        }`;

    const weapon = await this.makeIdRequest('weapon', query);
    return weapon;
  }
}
