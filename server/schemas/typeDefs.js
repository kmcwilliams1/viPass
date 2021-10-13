const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
<<<<<<< HEAD
    permissions: [Permission]!
=======
    isAdmin: Boolean
>>>>>>> 3340a67c3cf11d54b4cbb27f94ef9841ac42f2a8
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
<<<<<<< HEAD
    permissions(username: String): [Permission]
    permission(thoughtId: ID!): Permission
=======
>>>>>>> 3340a67c3cf11d54b4cbb27f94ef9841ac42f2a8
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
<<<<<<< HEAD
    addThought(thoughtText: String!): Permission
    addComment(thoughtId: ID!, commentText: String!): Permission
    removeThought(thoughtId: ID!): Permission
    removeComment(thoughtId: ID!, commentId: ID!): Permission
=======
>>>>>>> 3340a67c3cf11d54b4cbb27f94ef9841ac42f2a8
  }
`;

module.exports = typeDefs;
