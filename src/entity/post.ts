import {Max, Min} from "class-validator";
import {ArgsType, Field, ObjectType} from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import {Comment} from "./comment";
import { User } from './user';

@ObjectType()
@Entity()
export class Post {

    @Field()
    @PrimaryGeneratedColumn()
    id: String;

    @Field(type=>User)
    @ManyToOne(()=>User, user => user.id)
    @JoinColumn()
    user: String;

    @Field()
    @Column()
    title: String;

    @Field()
    @Column()
    body: String;

    @Field(type => [Comment])
    @OneToMany(()=>Comment, comment => comment.post)
    comments: Comment[]
    
}

@ArgsType()
export class PostArgs {

    @Field()
    @Min(0)
    skip: number = 0;
    
    @Field()
    @Min(1)
    @Max(50)
    take: number = 25
}