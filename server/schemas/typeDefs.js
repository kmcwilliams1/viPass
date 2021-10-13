const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    isAdmin: Boolean
  }

  type Permission {
    _id: ID
    accessEvent: String!
    accessArea: String!
    accessCreator: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    makeAdmin(_id: ID!): User
    addUser(
      username: String!
      email: String!
      password: String!
      isAdmin: Boolean
    ): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
