import { Photo } from './../entity/photo';
import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import { NewPhoto } from '../inputs/newPhoto';
import { User } from '../entity/user';
const fetch = require('node-fetch');

@Resolver(Photo)
export class PhotoResolver {

    @Query(returns => [Photo])
    async getPhotos() {
        return new Promise((resolve, reject) => {
            fetch('https://jsonplaceholder.typicode.com/photos')
            .then((resp) => resp.json())
            .then((response) => {
                resolve(response)
            })
            .catch((err) => {
                reject(err)
            })

        })
    }

    @Mutation(returns => Photo)
    addPhoto(
        @Arg("newPhotoData") newPhotoData: NewPhoto,
        @Ctx("user") user: User
    ): Promise<Photo> {
        return new Promise((resolve, reject) => {
            const p = new Photo();
            resolve(p)
        })
    }

}