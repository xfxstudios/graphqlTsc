import {Field, ObjectType} from "type-graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Geo {

    @PrimaryGeneratedColumn()
    id: String

    @Field()
    @Column()
    lat: String;
    
    @Field()
    @Column()
    lng: String;
}