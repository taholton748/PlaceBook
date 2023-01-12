/* eslint-disable eol-last */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Post {
  _id: ID
  username: String
  photos: String
  location: String
  postBody: String
  rating: Int
  likes: [Like]
  likeCount: Int
  comments: [Comment]
  commentCount: Int
  createdAt: String
}
type Comment {
  _id: ID
  commentBody: String
  username: String
  createdAt: String
}
type Like {
  _id: ID
  username: String
}
type User {
  _id: ID
  firstName: String
  lastName: String
  username: String
  email: String
  isAuthenticated: Boolean
  posts: [Post]
  friends: [User]
}
type Auth {
  token: ID!
  user: User
}
type Query {
  getCurrentUser: User
  getPosts(username: String): [Post]
  getPost(postId: ID): Post
  getUsers: [User]
  getUser(username: String!): User
}
type Mutation {
  createUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
  updateUser(username: String!, firstName: String!, lastName: String!, email: String!): User
  deleteUser: User
  login(email: String!, password: String!): Auth
  createPost(location: String!, postBody: String!, photos: String!, rating: Int!): Post
  deletePost(postId: ID!): Post
  likePost(postId: ID!):Post
  addComment(postId: ID!, commentBody: String!):Post
}
`;

module.exports = typeDefs;