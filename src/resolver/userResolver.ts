import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import { getConnection, TransactionManager } from 'typeorm';
import { User } from '../entity/user';
import { NewUser } from '../inputs/newUser';
import { Company } from '../entity/company';
import { Geo } from '../entity/geo';
import { Address } from '../entity/address';
import { Post } from '../entity/post';
import {Comment} from "../entity/comment";

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
            .where("user.id = :id", {id})
            .getOne();

            const post = await con.getRepository(Post)
            .createQueryBuilder("post")
            .where("post.userId = :id",{id:response.id})
            .getMany();

            const coment = await con.getRepository(Comment)
            .createQueryBuilder("comment")
            .where("comment.email = :email", { email: response.email})
            .getMany();

            return {...response, posts: post, comments: coment }

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
                    const company = new Company();
                    company.name = newUser.company_name;
                    company.catchPhrase = newUser.company_catchPhrase,
                    company.bs = newUser.company_bs;
                    await TransactionManager.save(company);
        
                    const geo = new Geo();
                    geo.lat = "";
                    geo.lng = "";
                    await TransactionManager.save(geo);
        
                    const address = new Address();
                    address.street = newUser.address_street;
                    address.suite = newUser.address_suite;
                    address.city = newUser.address_city;
                    address.zipcode = newUser.address_zipcode;
                    address.geo = geo;
                    await TransactionManager.save(address);
        
                    const nUser    = new User();
                    nUser.name     = newUser.name;
                    nUser.username = newUser.username;
                    nUser.email    = newUser.email;
                    nUser.phone    = newUser.phone;
                    nUser.website  = newUser.website;
                    nUser.cedula = newUser.cedula;
                    nUser.genero = newUser.genero;
                    nUser.company = company;
                    nUser.address = address;
                    const user = await TransactionManager.save(nUser);
                    
                    resolve(user);
                })

            }catch(err) {
                throw new Error(err.message);                
            };

        })

    }

}