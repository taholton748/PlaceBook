/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query getUsers {
    getUsers {
      _id
      firstName
      lastName
      username
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
  query getUser($username: String!) {
    getUser(username: $username) {
      _id
      firstName
      lastName
      username
      email
      posts {
        _id
        location
        postBody
        createdAt
        commentCount
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
      username
      friends {
        _id
        username
        firstName
        lastName
        email
      }
      posts {
        _id
        postBody
        location
        rating
        photos
        commentCount
        comments {
          _id
          username
          commentBody
        }
        likeCount
        likes {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts ($username: String) {
    getPosts (username: $username) {
      _id
      photos
      location
      postBody
      createdAt
      username
      likes {
        _id
        username
      }
      likeCount
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const QUERY_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      _id
      photos
      location
      title
      postBody
      createdAt
      username
      likes {
        _id
        username
        createdAt
      }
      likeCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;
