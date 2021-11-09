import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const MAKE_ADMIN = gql`
  mutation makeAdmin($username: String!) {
    makeAdmin(username: $username) {
      _id
      username
    }
  }
`;

export const REMOVE_ADMIN = gql`
  mutation removeAdmin($userId: ID!) {
    removeAdmin(userId: $userId) {
      _id
      username
      isAdmin
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PERMISSION_TO_TIER = gql`
  mutation addPermissiontoTier($accessArea: String!, $tierName: String!) {
    addPermissiontoTier(accessArea: $accessArea, tierName: tierName) {
      accessArea
    }
  }
`;

export const ADD_PERMISSION = gql`
  mutation addPermission($accessArea: String!) {
    addPermission(accessArea: $accessArea) {
      accessArea
    }
  }
`;

export const REMOVE_PERMISSION = gql`
  mutation removePermission($permissionId: ID!) {
    removePermission(permissionId: $permissionId) {
      _id
      accessArea
    }
  }
`;

export const ADD_TIER_TO_EVENT = gql`
      mutation addTierToEvent($tierName: String!, $name: String!) {
        addTierToEvent(tierName: $tierName, name: $name) {
          tierName
        }
      }
`;

export const ADD_TIER = gql`
  mutation addTier($tierName: String!) {
    addTier(tierName: $tierName) {
      _id
      tierName
    }
  }
`;

export const REMOVE_TIER = gql`
  mutation removeTier($tierId: ID!) {
    removeTier(tierId: $tierId) {
      _id
      name
    }
  }
`;
export const ADD_EVENT = gql`
  mutation addEvent($name: String!) {
    addEvent(name: $name) {
      _id
      name
    }
  }
`;

export const REMOVE_EVENT = gql`
  mutation removeEvent($eventId: ID!) {
    removeEvent(eventId: $eventId) {
      _id
      name
    }
  }
`;
