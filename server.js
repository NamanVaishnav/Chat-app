import { ApolloServer, gql } from 'apollo-server'



// create schema
const typeDefs = gql`
    type Query{
         greet:String
    }
`  // templet literal - able to write string in multiple line


// create resolver



const resolvers = {
    Query: {
        greet: () => "Hello World"
    }
}


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log('🚀 Server ready at ${url}', url);
});