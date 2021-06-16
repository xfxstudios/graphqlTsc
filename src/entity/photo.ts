import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Photo {
    @Field()
    albumId: String;
    @Field()
    id: String;
    @Field()
    title: String;
    @Field()
    url: String;
    @Field()
    thumbnailUrl: String;
}