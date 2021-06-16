import {Max, Min, min} from "class-validator";
import {ArgsType, Field, ObjectType} from "type-graphql";

@ObjectType()
export class Post {
    @Field()
    userId: String;

    @Field()
    id: String;

    @Field()
    title: String;

    @Field()
    body: String;
}

@ArgsType()
export class PostArgs {
    @Field()
    @Min(0)
    skip: number = 0;

    @Field()
    @Min(1)
    @Max(50)
    take: number = 25
}