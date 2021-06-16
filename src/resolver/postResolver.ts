import {Args, Query, Resolver} from "type-graphql";
import { Post, PostArgs } from '../entity/post';
const fetch = require('node-fetch');

@Resolver(Post)
export class PostResolver {

    @Query(restunrs => [Post])
    async getPosts(@Args() {skip, take}: PostArgs) {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/posts')
            .then((resp) => resp.json())
            .then((response) => {
                resolve(response)
            })
        })
    }

}