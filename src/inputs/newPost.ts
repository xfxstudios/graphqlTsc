import {Field, InputType} from "type-graphql";

@InputType()
export class NewPost {
    @Field()
    userId: String;

    @Field()
    title: String;

    @Field()
    body: String;

}