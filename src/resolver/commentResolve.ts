import {Arg, Query, Resolver} from "type-graphql";
import { Comment } from '../entity/comment';
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
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/comments?email='+email,)
            .then((resp) => resp.json())
            .then((data) => {
                resolve(data)
            })
            .catch((err) => reject(err))
        })
    }

}