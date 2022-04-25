import axios, { AxiosInstance } from 'axios';
import logging from '../utils/logging';
import { gql, GraphQLClient, request, Variables } from 'graphql-request';

const NAMESPACE: string = "ERAPI";

export default class ERApiController {

    private client: GraphQLClient = new GraphQLClient('https://eldenring.fanapis.com/api/graphql');

    private searchQuery(route: string, name: string) : string {
        return gql`
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
        return await this.makeSearchRequest('armor', name);
    }

    public async getArmorsById(id: string) {
        let query = gql`
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

        return await this.makeIdRequest('armor', query);
    }

    public async searchItem(name: string) {
        return await this.makeSearchRequest('item', name);
    }

    public async getItemById(id: string) {
        let query = gql`
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

        return await this.makeIdRequest('item', query);
    }

    public async searchShields(name: string){
        return await this.makeSearchRequest('shield', name);
    }

    public async getShieldsById(id: string) {
        let query = gql`
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

        return await this.makeIdRequest('shield', query);
    }

    public async searchWeapons(name: string){
        return await this.makeSearchRequest('weapon', name);
    }

    public async getWeaponsById(id: string) {
        let query = gql`
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

        return await this.makeIdRequest('weapon', query);
    }

}