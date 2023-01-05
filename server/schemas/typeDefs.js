const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Comment {
  _id: ID
  commentBody: String
  username: String
  createdAt: String

}
type Post {
  _id: ID
  username: String
  firstName: String
  lastName: String
  photos: String
  description: String
  rating: Int
  likes: Int
  comments: [Comment]
  createdAt: String
}
type User {
  _id: ID
  username: String
  firstName: String
  lastName: String
  email: String
  isAuthenticated: Boolean
}
type Auth {
  token: ID
  user: User
}
type Query {
  getCurrentUser: User
  getPosts(username: String): [Post]
  getUsers(username: String): [User]
}
type Mutation {
  createUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
  updateUser(username: String!, firstName: String!, lastName: String!, email: String!): User
  deleteUser: User
  login(email: String!, password: String!): Auth
  createPost(title: String!, description: String!, photos: String!, rating: Int!): User
}
`;

module.exports = typeDefs;
