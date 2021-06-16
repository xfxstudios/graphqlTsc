import {Field, ObjectType} from "type-graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: String

    @Field()
    @Column()
    name: String;
    
    @Field()
    @Column()
    catchPhrase: String;

    @Field()
    @Column()
    bs: String;
}