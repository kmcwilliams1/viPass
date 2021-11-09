const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    permissions: [Permissions]!
    isAdmin: Boolean
    events: [Event]
  }

  type Permissions {
    _id: ID
    accessEvent: String!
    accessArea: String!
    accessCreator: String!
  }

  type Tier {
    _id: ID!
    tierName: String!
    permissions: [Permissions]!
    users: [User]!
  }

  type Event {
    _id: ID!
    name: String!
    tiers: [Tier]!
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
    events: [Event]
    me: User
  }

  input newPermission {
    _id: ID
    accessEvent: String!
    accessArea: String!
    accessCreator: String!
    accessTier: String!
  }

  type Mutation {
    makeAdmin(username: String!): User
    removeAdmin(userId: ID!): User
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPermission(accessArea: String!): Permissions
    addPermissiontoTier(
      accessArea: String!
      tierName: String!
    ): Permissions
    removePermission(permissionId: ID!): Permissions
    addTierToEvent(
    tierName: String,
    name: String!
     ): Tier
    addTier(tierName: String!): Tier
    removeTier(tierId: ID!): Tier
    addUserToTier(
    email: String!,
    eventId: ID!
     ): Tier
    addEvent(name: String!): Event
    removeEvent(eventId: ID!): Event
  }
`;

module.exports = typeDefs;
