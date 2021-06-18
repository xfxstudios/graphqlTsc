import {Query, Resolver} from "type-graphql";
import { Address } from '../entity/address';
import { getConnection } from 'typeorm';

@Resolver(Address)
export class AddressResolver {

    @Query(returns => [Address])
    async getAllAddress(): Promise<any>{
        return new Promise(async (resolve, reject)=> {
            const con = await getConnection();

            const response = await con.getRepository(Address)
            .createQueryBuilder("address")
            .leftJoinAndSelect("address.geo", "geo")
            .getMany();

            resolve(response);
        })

    }

}