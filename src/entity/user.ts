import {Field, ObjectType} from 'type-graphql';
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Address } from './address';
import { Company } from './company';
import { Post } from './post';
import {Comment} from './comment';

@ObjectType()
@Entity()
export class User {

    @Field()
    @PrimaryGeneratedColumn()
    id: String;

    @Field()
    @Column()
    name: String;

    @Field()
    @Column()
    username: String;

    @Field()
    @Column({unique:true})
    email: String;

    @Field()
    @OneToOne(()=>Address)
    @JoinColumn()
    address: Address;

    @Field()
    @Column()
    phone: String;

    @Field()
    @Column()
    website: String;

    @Field()
    @Column()
    cedula: String;

    @Field()
    @Column()
    genero: String;

    @Field()
    @OneToOne(()=>Company)
    @JoinColumn()
    company: Company;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdAt: String

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: String

    @Field(type=>[Post])
    posts: Post[]

    @Field(type=>[Comment])
    comments: Comment[]

}