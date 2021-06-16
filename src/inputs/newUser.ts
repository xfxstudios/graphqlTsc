import {Field, InputType} from "type-graphql";

@InputType()
export class NewUser {

    @Field()
    name: String;

    @Field()
    username: String;

    @Field()
    email: String;

    @Field()
    phone: String;

    @Field()
    website: String;

    @Field()
    cedula: String;

    @Field()
    genero: String;

    @Field()
    address_street: String;

    @Field()
    address_suite: String;
    
    @Field()
    address_city: String;
    
    @Field()
    address_zipcode: String;
    
    @Field()
    company_name: String;
    
    @Field()
    company_catchPhrase: String;
    
    @Field()
    company_bs: String;
    

}