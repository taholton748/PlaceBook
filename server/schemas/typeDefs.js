/* eslint-disable eol-last */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Post {
  _id: ID
  userId: ID
  photos: String
  location: String
  postBody: String
  rating: Number
  likes: [Like]
  likeCount: Int
  comments: [Comment]
  commentCount: Int
  createdAt: String
}
type Comment {
  _id: ID
  commentBody: String
  userId: ID
  createdAt: String
}
type Like {
  _id: ID
  userId: ID
}
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  isAuthenticated: Boolean
  posts: [Post]
  friends: [User]
}
type Auth {
  token: ID
  user: User
}
type Query {
  getCurrentUser: User
  getPosts(userId: ID): [Post]
  getPost(postId: ID): Post
  getUsers: [User]
  getUser(userId: ID): User
}
type Mutation {
  createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  updateUser(firstName: String!, lastName: String!, email: String!): User
  deleteUser: User
  login(email: String!, password: String!): Auth
  createPost(location: String!, postBody: String!, photos: String!, rating: Int!): Post
  deletePost(postId: ID!): Post
  likePost(postId: ID!):Post
  addComment(postId: ID!, commentBody: String!):Post
}
`;

module.exports = typeDefs;