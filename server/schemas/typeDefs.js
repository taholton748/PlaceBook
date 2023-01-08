/* eslint-disable eol-last */
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Post {
  _id: ID
  userId: String
  firstName: String
  lastName: String
  photos: String
  title: String
  description: String
  rating: Int
  likes: Int
  comments: [Comment]
  createdAt: String
}
type Comment {
  _id: ID
  commentBody: String
  userId: ID
  createdAt: String
}
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  isAuthenticated: Boolean
  posts: [Post]
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
  createPost(title: String!, description: String!, photos: String!, rating: Int!): Post
  deletePost(postId: ID!): Post
}
`;

module.exports = typeDefs;