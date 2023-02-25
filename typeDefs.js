import { gql } from "apollo-server"
// create schema
const typeDefs = gql`

type Query{
  users: [User]
  messagesByUser(receiverId:Int!): [Message]
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

scalar Date

type Message {
  id:ID!
  text:String!
  receiverId:Int!
  senderId:Int!
  createdAt:Date!
}

type Mutation{
     sigupUser(userNew:UserInput!):User
     signinUser(userSignin:UserSignInput!): Token
     createMessage(receiverId: Int!, text: String!):Message
}

`

export default typeDefs