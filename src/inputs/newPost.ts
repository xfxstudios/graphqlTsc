import {Field, InputType} from "type-graphql";

@InputType()
export class NewPost {
    @Field()
    user: String;

    @Field()
    title: String;

    @Field()
    body: String;

}