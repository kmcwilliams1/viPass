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
  mutation makeAdmin($userId: ID!) {
    makeAdmin(userId: $userId) {
      _id
      username
      isAdmin
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

export const ADD_PERMISSION = gql`
  mutation addPermissiontoTier(
    $accessEvent: String
    $accessArea: String
    $tierId: ID
  ) {
    addPermissiontoTier(
      accessEvent: $accessEvent
      accessArea: $accessArea
      tierId: $tierId
    ) {
      accessEvent
      accessArea
    }
  }
`;

export const REMOVE_PERMISSION = gql`
  mutation removePermission($permissionId: ID!) {
    removePermission(permissionId: $permissionId) {
      permissionId
      accessEvent
      accessArea
    }
  }
`;

export const ADD_TIER = gql`
  mutation addTier($name: String!, $userId: ID!) {
    addTier(name: $name, userId: $userId) {
      name
      permissions
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
