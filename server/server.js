const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const dotenv = require('dotenv').config();
const http = require('http');
const path = require('path');
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");

// Create App 
const app = express();

// typeDefs
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs")));
 
// resolvers
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, "./resolvers")));

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
