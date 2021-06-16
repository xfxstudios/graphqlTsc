import {Arg, Args, Mutation, Query, Resolver} from "type-graphql";
import { Post, PostArgs } from '../entity/post';
import { getConnection } from 'typeorm';
import { Comment } from '../entity/comment';
import { NewPost } from '../inputs/newPost';
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

    @Query(returns => [Post])
    async getUserPosts(@Arg("userId") userId:String) {
        const con = await getConnection();

        const response = await con.getRepository(Post)
        .createQueryBuilder("post")
        .where("post.userId = :id", {id: userId})
        .getMany();

        return response;
    }

    @Query(returns => Post)
    async getPostById(@Arg("id") id:String) {

        const con = await getConnection();
        const response = await con.getRepository(Post)
        .createQueryBuilder("post")
        .where("post.id = :id", {id})
        .getOne();
        
        
        const comment = await con.getRepository(Comment)
        .createQueryBuilder("comment")
        .where("comment.postId = :id", {id: response.id})
        .getMany();

        const out = {...response, comments: comment}

        return out
    }

    @Mutation(returns => Post)
    addPost(
        @Arg("newPost") newPost: NewPost
    ): Promise<Post> {
        return new Promise(async (resolve, reject) => {
            const con = await getConnection();

            const post = new Post();
            post.userId = newPost.userId;
            post.title = newPost.title;
            post.body = newPost.body;

            const response = await con.manager.save(post);

            resolve(response);
        })
    }

}