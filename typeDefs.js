import { gql } from "apollo-server"
// create schema
const typeDefs = gql`

type Query{
  users: [User]
}

type User {
   id:ID!
   firstName:String!
   lastName:String!
   email:String!
}

input UserInput {
  firstName:String!
  lastName:String!
  email:String!
  password:String!
}

input UserSignInput {
  email:String!
  password:String!
}

type Token {
  token: String!
}

type Mutation{
     sigupUser(userNew:UserInput!):User
     signinUser(userSignin:UserSignInput!): Token
}

`

export default typeDefs