/* eslint-disable no-underscore-dangle */
const { AuthenticationError } = require('apollo-server-express');
const omit = require('lodash.omit');

const { User, Post } = require('../models');

const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getCurrentUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('posts')
          .populate('friends');

        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    getPosts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    getPost: async (parent, { _id }) => Post.findOne({ _id }),
    getUsers: async (parent, { username }) => {
      const params = username ? { username } : {};
      User.find(params)
        .select('-__v -password')
        .populate('friends')
        // make sure syntax is correct so that a user request populates with posts
        .populate('post');
    },
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
    // eslint-disable-next-line object-curly-newline
    createPost: async (parent, args, context) => {
      if (context.user) {
        // const user = authMiddleware(context);
        const newPost = new Post({ ...args, username: context.user.username });
        const post = await newPost.save();

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { posts: post._id } },
          { new: true }
        );

        return post;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  }
};

module.exports = resolvers;
