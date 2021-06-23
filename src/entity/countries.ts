import {Field, ObjectType} from "type-graphql";
import {Entity} from "typeorm";

@ObjectType()
export class Countries {
    @Field()
    name: String;

    @Field()
    alpha2code: String;

    @Field()
    alpha3code: String;

    @Field()
    capital: String;

    @Field()
    region: String;

    @Field()
    subregion: String;

    @Field()
    demonym: String;

    @Field()
    numericCode: String;

    @Field()
    flag: String;
}