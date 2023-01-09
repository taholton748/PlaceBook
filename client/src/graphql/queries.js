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
      imageUrl
      location
      title
      postBody
      createdAt
      userId
      postLikes {
        id
        userId
        createdAt
      }
      postLikeCount
      commentCount
      comments {
        id
        content
        createdAt
        userId
        commentLikes {
          id
          userId
          createdAt
        }
        commentLikeCount
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
      userId
      postLikes {
        _id
        userId
        createdAt
      }
      postLikeCount
      comments {
        _id
        commentBody
        createdAt
        userId
        commentLikes {
          id
          userId
          createdAt
        }
        commentLikeCount
      }
    }
  }
`;
