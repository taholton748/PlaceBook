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
    // this query gets all posts, or posts by certain users (search by userId)
    getPosts: async (parent, { userId }) => {
      const params = userId ? { userId } : {};
      const posts = await Post.find(params).sort({ createdAt: -1 })
        .populate('likes');

      return posts;
    },
    // get single post by id
    // eslint-disable-next-line arrow-body-style
    getPost: async (parent, { postId }) => {
      return Post.findOne({ postId });
    },
    getUsers: async () => {
      const users = await User.find()
        .select('-__v -password')
        .populate('friends')
        // make sure syntax is correct so that a user request populates with posts
        .populate('post');
      return users;
    },
    // get user by ID
    getUser: async (parent, { userId }) => {
      const user = await User.findOne(userId)
        .select('-__v -password')
        .populate('friends')
        // make sure syntax is correct so that a user request populates with posts
        .populate('post');

      return user;
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
        const newPost = new Post({ ...args, userId: context.user._id });
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
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findByIdAndDelete(postId);
        return post;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    likePost: async (parent, { postId }, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { likes: { userId: context.user._id } } },
          { new: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { comments: { commentBody, userId: context.user._id } } },
          { new: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
