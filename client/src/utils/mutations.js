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
  mutation addPermission($newPermission: newPermission!) {
    addPermission(newPermission: $newPermission) {
          _id
          accessEvent 
          accessArea
          accessCreator
          accessTier
    }
  }
`;

export const REMOVE_PERMISSION = gql`
  mutation removePermission($permissionId: ID!, $userId: ID!) {
    removePermission(permissionId: $permissionId, userId: $userId) {
      userId
      permissionId
      accessEvent
      accessArea
    }
  }
`;



export const ADD_TIER = gql`
  mutation addTier(
    $name: String!, $permissions: String!, $users: String ) {
    addTier(permissions: $permissions, users: $users, name: $name) {
      permissions,
      users,
      name
    }
  }
`;

export const REMOVE_TIER = gql`
  mutation removeTier(
    $name: String!, $permissions: String!, $users: String ) {
      removeTier(permissions: $permissions, users: $users, name: $name) {
      permissions,
      users,
      name
    }
  }
`;