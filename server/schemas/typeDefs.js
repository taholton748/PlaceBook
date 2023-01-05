const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID
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
}

type Mutation {
  createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
  updateUser(firstName: String!, lastName: String!, email: String!): User
  deleteUser: User
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
