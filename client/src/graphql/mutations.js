/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
mutation registerUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password ) {
    token,
    user {
      firstName,
      lastName,
      email
    }
  }
}
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id,
        firstName,
        lastName,
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($firstName: String!, $lastName: String!, $email: String!) {
  updateUser(firstName: $firstName, lastName: $lastName, email: $email) {
    firstName,
    lastName,
    email
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser {
  deleteUser {
    firstName,
    lastName,
    email
  }
}
`;
