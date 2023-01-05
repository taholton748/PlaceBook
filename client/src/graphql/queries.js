/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const QUERY_CURRENT_USER = gql`
query currentUser {
  getCurrentUser {
    _id,
    email,
    firstName,
    lastName
  }
}
`;
