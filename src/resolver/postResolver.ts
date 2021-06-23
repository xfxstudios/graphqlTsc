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
        return new Promise(async (resolve, reject) => {
            const con = getConnection();
            const response = await con.getRepository(Post)
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.user","user")
            .leftJoinAndSelect("post.comments","comments")
            .getMany();

            resolve(response);
        })
    }

    @Query(returns => [Post])
    async getUserPosts(@Arg("userId") userId:String, @Arg("take") take: number) {
        const con = await getConnection();

        const response = await con.getRepository(Post)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.user","user")
        .leftJoinAndSelect("post.comments","comments")
        .where("post.user = :id", {id: userId})
        .getMany();
        
        return response;

    }

    @Query(returns => Post)
    async getPostById(@Arg("id") id:String) {

        const con = await getConnection();
        const response = await con.getRepository(Post)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.user","user")
        .leftJoinAndSelect("post.comments","comments")
        .where("post.id = :id", {id})
        .getOne();

        const out = response;

        return out
    }

    @Mutation(returns => Post)
    addPost(
        @Arg("newPost") newPost: NewPost
    ): Promise<Post> {
        return new Promise(async (resolve, reject) => {
            const con = await getConnection();

            const post = new Post();
            post.user = newPost.user;
            post.title = newPost.title;
            post.body = newPost.body;

            const response = await con.manager.save(post);

            resolve(this.getPostById(response.id));
        })
    }

}