import {Arg, Mutation, Query, Resolver} from "type-graphql";
import { Comment } from '../entity/comment';
import { NewComment } from '../inputs/newComment';
import { getConnection } from 'typeorm';
const fetch = require('node-fetch');

@Resolver(Comment)
export class CommentResolve {

    @Query(returns => [Comment])
    async getAllComments() {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/comments')
            .then((resp) => resp.json())
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
        })
    }

    @Query(returns => [Comment])
    async getCommentById(@Arg("postId") postId: string) {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/comments?postId='+postId,)
            .then((resp) => resp.json())
            .then((data) => {
                resolve(data)
            })
            .catch((err) => reject(err))
        })
    }

    @Query(returns => [Comment])
    async getCommentByEmail(@Arg("email") email: string) {
            const con = await getConnection();
            const response = con.getRepository(Comment)
            .createQueryBuilder("comment")
            .where("comment.email = :email",{email})
            .getMany();

            return response
    }

    @Mutation(returns => Comment)
    addComment(
        @Arg("newComment") newComment: NewComment
    ): Promise<Comment> {
        return new Promise(async (resolve, reject) => {
            const con = await getConnection();

            const comment = new Comment();
            comment.post = newComment.post;
            comment.name = newComment.name;
            comment.email = newComment.email;
            comment.body = newComment.body;

            const response = await con.manager.save(comment);

            resolve(response);

        })
    }

}