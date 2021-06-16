import {Field, ObjectType} from 'type-graphql';
import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Geo } from './geo';

@ObjectType()
@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: String;

    @Field()
    @Column()
    street:String;

    @Field()
    @Column()
    suite:String;

    @Field()
    @Column()
    city:String;

    @Field()
    @Column()
    zipcode:String;

    @Field()
    @OneToOne(()=>Geo)
    @JoinColumn()
    geo: Geo;
}