import {Field, ObjectType} from "type-graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Comment {
    @Field()
    @PrimaryGeneratedColumn()
    id: String;

    @Field()
    @Column()
    postId: String;

    @Field()
    @Column()
    name: String;

    @Field()
    @Column()
    email: String;

    @Field()
    @Column()
    body: String;
}