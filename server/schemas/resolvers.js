const { AuthenticationError } = require('apollo-server-express');
const omit = require('lodash.omit');

const { User, Post } = require('../models');

const { signToken, authMiddleware } = require('../utils/auth');

const resolvers = {
  Query: {
    getCurrentUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select('-__v -password');
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    getPosts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    getUsers: async () => User.find()
      .select('-__v -password')
      .populate('friends')
      // make sure syntax is correct so that a user request populates with posts
      .populate('posts'),
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      user.isAuthenticated = true;
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndDelete(context.user._id);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) throw new AuthenticationError('Incorrect credentials');

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) throw new AuthenticationError('Incorrect credentials');

      omit(user._doc, 'password');

      const token = signToken(user);

      return { token, user };
    },
    createPost: async (_, { title, content, imageUrl }, context) => {
      const user = authMiddleware(context);
      const newPost = new Post({
        user: user.id,
        username: user.username,
        title,
        content,
        imageUrl,
        dateCreated: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
  }
};

module.exports = resolvers;
