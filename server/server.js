const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core');
const dotenv = require('dotenv').config();
const http = require('http');

// Create App 
const app = express();

// type  query / mutation /subscription
const typeDefs = `
    type Query {
        totalPosts: Int! 
    }
`;

//resolver
const resolvers = {
    Query: {
        totalPosts: () => 42
    }
}

async function startApolloServer() {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],

    });

    await apolloServer.start();

    // Mount Apollo middleware here.
    apolloServer.applyMiddleware({ app });

    //Port
    app.listen(process.env.PORT, () => {
        console.log(`listening on port on ${process.env.PORT}`);
    })

    return { apolloServer, app }; 
}

startApolloServer();
