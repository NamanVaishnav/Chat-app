import { ApolloServer, gql } from 'apollo-server'
import crypto from 'crypto'

console.log(crypto.randomUUID())

const users = [
    {
        id: "1",
        firstname: "naman",
        lastname: "vaishnav",
        email: "naman@gmail.com",
        password: "123456"
    },
    {
        id: "2",
        firstname: "jhanvi",
        lastname: "vaishnav",
        email: "jhanvi@gmail.com",
        password: "123456"
    }
]

// create schema
const typeDefs = gql`
    type Query{
         users:[User]
         user(id:ID!): User
    }

    type User{
        id:ID
        firstname:String
        lastName:String
        email:String
   }

   input UserInput{
        firstname: String!
        lastName:String!
        email:String!
        password:String!
   }

    type Mutation{
        createUser(userNew: UserInput!): User
    }

` // templet literal - able to write string in multiple line


// create resolver
const resolvers = {
    Query: {
        users: () => users,
        user: (parent, { id }, context) => {
            console.log(id);
            return users.find(item => item.id == id);
        }
    },
    Mutation: {
        createUser: (_, { userNew }) => {
            const newUser = {
                id: crypto.randomUUID(),
                ...userNew
            }
            users.push(newUser);
            return newUser;
        }
    }
}


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log('🚀 Server ready at ${url}', url);
});