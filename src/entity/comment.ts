import {Field, ObjectType} from "type-graphql";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Post } from './post';

@ObjectType()
@Entity()
export class Comment {
    @Field()
    @PrimaryGeneratedColumn()
    id: String;

    @Field()
    @Column()
    @ManyToOne(()=> Post, post => post.id)
    post: String;

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