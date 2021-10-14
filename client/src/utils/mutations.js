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

export const MAKE_ADMIN = gql`
  mutation makeAdmin($userId: ID!) {
    makeAdmin(userId: $userId) {
      _id
      username
      isAdmin
    }
  }
`;
export const ADD_PERMISSION = gql`
  mutation addPermission(
    $accessEvent: String!
    $accessArea: String!
    $accessTier: String!
    $userId: ID!
  ) {
    addPermission(
      accessEvent: $accessEvent
      accessArea: $accessArea
      accessTier: $accessTier
      userId: $userId
    ) {
      token
      user {
        _id
        username
        permissions {
          accessEvent
          accessArea
        }
      }
    }
  }
`;
export const REMOVE_PERMISSION = gql`
  mutation removePermission($permissionId: ID!, $userId: ID!) {
    removePermission(permissionId: $permissionId, userId: $userId) {
      accessEvent
      accessArea
    }
  }
`;
