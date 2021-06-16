import {Arg, Args, Mutation, Query, Resolver} from "type-graphql";
import { Post, PostArgs } from '../entity/post';
import { getConnection, createQueryBuilder } from 'typeorm';
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
            .getMany();

            resolve(response);
        })
    }

    @Query(returns => [Post])
    async getUserPosts(@Arg("userId") userId:String, @Arg("take") take: number) {
        const con = await getConnection();

        const response = await con.getRepository(Post)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.userId","post")
        .where("post.userId = :id", {id: userId})
        .getMany();
        console.log(response);
        

        const nList = response.map(async (item, i) => {
            return {...item, comments: await con.getRepository(Comment).createQueryBuilder("comment").where("comment.postId = :id",{id: item.id}).getMany()};
        })

        return nList;
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