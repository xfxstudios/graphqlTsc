import "reflect-metadata";

import { ApolloServer } from "apollo-server";

import { buildSchema } from 'type-graphql';
import { UserResolver, PostResolver, PhotoResolver } from './src/resolver';
import { CommentResolve } from './src/resolver/commentResolve';
import { createConnection } from 'typeorm';
import { AddressResolver } from './src/resolver/addressResolver';

const PORT = process.env.PORT || 4000;

async function bootstrap() {

    await createConnection();

    const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver, PhotoResolver, CommentResolve, AddressResolver]
    });

    const server = new ApolloServer({
        schema,
        playground: true,
    });

    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();