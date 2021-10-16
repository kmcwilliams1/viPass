const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    permissions: [Permissions]!
    isAdmin: Boolean
    tier: [Tier]
  }

  type Permissions {
    _id: ID
    accessEvent: String!
    accessArea: String!
    accessCreator: String!
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
    tiers: [Tier]
    me: User
  }

input newPermission{
  _id: ID
    accessEvent: String!
    accessArea: String!
    accessCreator: String!
    accessTier: String!
}


  type Mutation {
    makeAdmin(userId: ID!): User
    removeAdmin(userId: ID!): User
    addUser(
      username: String!
      email: String!
      password: String!
      isAdmin: Boolean
    ): Auth
    login(email: String!, password: String!): Auth
    addPermissiontoTier(
      accessEvent: String!
      accessArea: String!
      tierId: ID!
    ): Permissions
    removePermission(permissionId: ID!, userId: ID!): Permissions
    addTier(name: String!, userId: ID!): Tier
    removeTier(tierId: ID!): Tier
  }
`;

module.exports = typeDefs;
