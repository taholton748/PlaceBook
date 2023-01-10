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
        posts {
          _id
          location
          postBody
        }
        friends {
          _id
          firstName
          lastName
          email
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($firstName: String!, $lastName: String!, $email: String!) {
  updateUser(firstName: $firstName, lastName: $lastName, email: $email) {
    _id,
    firstName,
    lastName,
    email
  }
}
`;

export const DELETE_USER = gql`
mutation deleteUser {
  deleteUser {
    _id,
    firstName,
    lastName,
    email
  }
}
`;

export const CREATE_POST = gql`
  mutation createPost($location: String!, $postBody: String!, $photos: String!, $rating: Int) {
    createPost(location: $location, postBody: $postBody, photos: $photos, rating: $rating) {
      _id
      userId
      location
      postBody
      photos
      rating
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      userId
      location
      postBody
      photos
      rating
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      userId
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentBody: String!) {
    addComment(postId: $postId, commentBody: $commentBody) {
      _id
      userId
      commentBody
    }
  }
`;
