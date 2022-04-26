import { gql, GraphQLClient } from 'graphql-request';
import logging from '../utils/logging';

const NAMESPACE = 'ERAPI';

export default class ERApiController {
  private client: GraphQLClient = new GraphQLClient('https://eldenring.fanapis.com/api/graphql');

  private graphQL = gql;

  private searchQuery(route: string, name: string): string {
    return this.graphQL`
        query get {
            ${route}(search: ${name}) {
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
      logging.error(NAMESPACE, `Could not get ${route} by id`);
      return { error: `Could not get ${route} by id` };
    }
  }

  public async searchArmors(name: string) {
    const armor = await this.makeSearchRequest('armor', name);
    return armor;
  }

  public async getArmorsById(id: string) {
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

  public async searchItem(name: string) {
    const item = await this.makeSearchRequest('item', name);
    return item;
  }

  public async getItemById(id: string) {
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

  public async searchShields(name: string) {
    const shield = await this.makeSearchRequest('shield', name);
    return shield;
  }

  public async getShieldsById(id: string) {
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

  public async searchWeapons(name: string) {
    const weapon = await this.makeSearchRequest('weapon', name);
    return weapon;
  }

  public async getWeaponsById(id: string) {
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
