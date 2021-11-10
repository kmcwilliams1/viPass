const { gql } = require("apollo-server-express");


const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    permissions: [Permissions]
    isAdmin: Boolean
    tierName: String
    tiers: [Tier]!
    event: [Event]
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
  }


    type Event {
        _id: ID!
        name: String!
        tier: [Tier]!
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
        tier: [Tier]
        events: [Event]
        me: User
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
            tierName: String!
            eventId : ID!
            ): Tier 
        
        addTier(tierName: String!): Tier
        
        removeTier(tierId: ID!): Tier
        addEvent(name: String!): Event
        removeEvent(eventId: ID!): Event
        
        addTierToUser(
            name: String!
            email: String!
            tierName: String!
        ): User
    }
`;

module.exports = typeDefs;
