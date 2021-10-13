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
  mutation makeAdmin($_id: ID!) {
    makeAdmin(_id: $_id) {
      token
      user {
        _id
        username
        isAdmin
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addPermission($thoughtText: String!) {
    addPermission(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($permissionId: ID!, $commentText: String!) {
    addComment(permissionId: $permissionId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
