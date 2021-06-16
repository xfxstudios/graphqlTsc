import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class Comment {
    @Field()
    postId: String;
    @Field()
    id: String;
    @Field()
    name: String;
    @Field()
    email: String;
    @Field()
    body: String;
}