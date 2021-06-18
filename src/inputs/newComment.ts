import { InputType, Field } from 'type-graphql';

@InputType()
export class NewComment{

    @Field()
    post: String;

    @Field()
    name: String;

    @Field()
    email: String;

    @Field()
    body: String;

}