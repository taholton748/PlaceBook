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

const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!, $imageUrl: String) {
    createPost(title: $title, content: $content, imageUrl: $imageUrl, location: $location) {
      imageUrl
      title
      content
      location
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      imageUrl
      location
      title
      content
      dateCreated
      username
      postLikes {
        id
        username
        dateCreated
      }
      postLikeCount
      comments {
        id
        content
        dateCreated
        username
        commentLikes {
          id
          username
          dateCreated
        }
        commentLikeCount
      }
    }
  }
`;

const GET_POSTS = gql`
  {
    getPosts {
      id
      imageUrl
      location
      title
      content
      dateCreated
      username
      postLikes {
        id
        username
        dateCreated
      }
      postLikeCount
      commentCount
      comments {
        id
        content
        dateCreated
        username
        commentLikes {
          id
          username
          dateCreated
        }
        commentLikeCount
      }
    }
  }
`;

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      postLikes {
        id
        username
        dateCreated
      }
      postLikeCount
    }
  }
`;



