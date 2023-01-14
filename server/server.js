const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { typeDefs, resolvers } = require('./schemas');

const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');

const PORT = process.env.PORT || 3000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer(typeDefs, resolvers);
