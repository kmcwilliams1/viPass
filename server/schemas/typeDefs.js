const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    permissions: [Permissions]!
    isAdmin: Boolean
  }

  type Permissions {
    _id: ID
    accessEvent: String!
    accessArea: String!
    accessCreator: String!
    accessTier: String!
  }

  type Tier {
    _id: ID!
    name: String!
    permissions: [Permissions]!
    users: [User]!
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    permissions(username: String): [Permissions]
    admins: [User]
    tiers: [Permissions]
    me: User
  }

  type Mutation {
    makeAdmin(userId: ID!): User
    addUser(
      username: String!
      email: String!
      password: String!
      isAdmin: Boolean
    ): Auth
    login(email: String!, password: String!): Auth
    addPermission(
      accessEvent: String!
      accessArea: String!
      accessLevel: String!
      accessTier: String!
      userId: ID!
    ): Permissions
    removePermission(permissionId: ID!, userId: ID!): Permissions
    removeAdmin(userId: ID!): User
  }
`;

module.exports = typeDefs;
