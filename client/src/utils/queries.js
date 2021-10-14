import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      permissions {
        _id
        accessEvent
        accessArea
        accessCreator
      }
    }
  }
`;

export const QUERY_PERMISSIONS = gql`
  query getPermissions {
    permissions {
      _id
      accessEvent
      accessArea
      accessCreator
    }
  }
`;
export const QUERY_ADMIN = gql`
  query getAdmins {
    admins {
      username
    }
  }
`;
export const QUERY_TIER = gql`
  query getTier {
    tiers {
      accessTier
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      permissions {
        _id
        accessEvent
        accessArea
        accessCreator
      }
    }
  }
`;
