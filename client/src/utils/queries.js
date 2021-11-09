import {gql} from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
  user{
      _id
      username
      email
      events {
        tiers {
          tierName
          permissions {
            _id
          }
        }
      }
    }
    }
`;

export const QUERY_PERMISSIONS = gql`
  query permissions {
    permissions {
      _id
      accessArea
      accessCreator
    }
  }
`;
export const QUERY_ADMIN = gql`
  query getAdmins {
    admins {
      _id
      username
    }
  }
`;
export const QUERY_TIER = gql`
  query getTier {
    tiers {
      _id
      tierName
      permissions {
        _id
        accessArea
        accessCreator
      }
    }
  }
`;
export const QUERY_EVENT = gql`
  query getEvent {
    events {
      name
      tiers {
      tierName
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      events {
        _id
        name
        tiers {
          _id
          name
          permissions {
            _id
          }
        }
      }
    }
  }
`;
