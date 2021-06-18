import {Length, MaxLength} from "class-validator";
import {Field, InputType} from "type-graphql";

@InputType()
export class NewPhoto {
    @Field()
    @MaxLength(20)
    albumId: String;

    @Field({nullable: true})
    @Length(30, 255)
    title: String;

    @Field()
    url: String;

    @Field()
    thumbnailUrl: String;
}