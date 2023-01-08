/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query getUsers {
    getUsers {
      _id
      firstName
      lastName
      email
      posts {
        _id
        title
        description
        createdAt
      }
    }    
  }
`;

export const QUERY_USER = gql`
  query getUser($_id: ID!) {
    getUser(userId: $_id) {
      _id
      firstName
      lastName
      email
      posts {
        _id
        title
        description
        createdAt
      }
    }
  }
`;

export const QUERY_CURRENT_USER = gql`
  query currentUser {
    getCurrentUser {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts ($userId: ID) {
    getPosts (userId: $userId) {
      _id
      title
      description
      photos
      location
      postLikes
      comments
      createdAt
    }
  }
`;
