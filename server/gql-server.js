const { ApolloServer } = require('apollo-server');
const {
    ApolloServerPluginLandingPageGraphQLPlayground
} = require('apollo-server-core');
require('dotenv').config()

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

// Graphql server
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
})

//Port
apolloServer.listen(process.env.PORT, () => {
    console.log(`Graph Ql serverlistening on port on ${process.env.PORT}`);
})
