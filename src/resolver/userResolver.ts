import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import { getConnection } from 'typeorm';
import { User } from '../entity/user';
import { NewUser } from '../inputs/newUser';
import { Company } from '../entity/company';
import { Geo } from '../entity/geo';
import { Address } from '../entity/address';

@Resolver(User)
export class UserResolver {

    @Query(returns => [User])
    async getUsers() {
        const con = await getConnection();
        const response = await con.getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.company","company")
        .leftJoinAndSelect("user.address","address")
        .leftJoinAndSelect("address.geo","geo")
        .leftJoinAndSelect("user.posts","posts")
        .leftJoinAndSelect("posts.comments","comments")
        .getMany();
        
        return response

    }

    @Query(returns => User)
    async getUserById(@Arg("id") id: string): Promise<User> {

            const con = await getConnection();
            const response = await con.getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.company","company")
            .leftJoinAndSelect("user.address","address")
            .leftJoinAndSelect("address.geo","geo")
            .leftJoinAndSelect("user.posts","posts")
            .leftJoinAndSelect("posts.comments","comments")
            .where("user.id = :id", {id})
            .getOne();

            return response

    }

    @Mutation(returns => User)
    addUser(
        @Arg("newUser") newUser: NewUser,
        @Ctx("user") user: User
    ): Promise<User> {
        return new Promise(async (resolve, reject) =>  {

            try {

                const con = getConnection();
    
                await con.transaction(async TransactionManager => {
                    const company       = new Company();
                    company.name        = newUser.company_name;
                    company.catchPhrase = newUser.company_catchPhrase,
                    company.bs          = newUser.company_bs;
                    await TransactionManager.save(company);
        
                    const geo = new Geo();
                    geo.lat   = "";
                    geo.lng   = "";
                    await TransactionManager.save(geo);
        
                    const address   = new Address();
                    address.street  = newUser.address_street;
                    address.suite   = newUser.address_suite;
                    address.city    = newUser.address_city;
                    address.zipcode = newUser.address_zipcode;
                    address.geo     = geo;
                    await TransactionManager.save(address);
        
                    const nUser    = new User();
                    nUser.name     = newUser.name;
                    nUser.username = newUser.username;
                    nUser.email    = newUser.email;
                    nUser.phone    = newUser.phone;
                    nUser.website  = newUser.website;
                    nUser.cedula   = newUser.cedula;
                    nUser.genero   = newUser.genero;
                    nUser.company  = company;
                    nUser.address  = address;
                    const user     = await TransactionManager.save(nUser);
                    
                    resolve(this.getUserById(user.id.toString()));
                })

            }catch(err) {
                throw new Error(err.message);                
            };

        })

    }

}