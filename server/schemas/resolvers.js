/* eslint-disable no-else-return */
/* eslint-disable eqeqeq */
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
    // this query gets all posts, or posts by certain users (search by username)
    getPosts: async (parent, { username }) => {
      const params = username ? { username } : {};
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
    getUser: async (parent, { username }) => {
      const user = await User.findOne({ username })
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
    createPost: async (parent, args, context) => {
      if (context.user) {
        // const user = authMiddleware(context);
        const post = new Post({ ...args, username: context.user.username });

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
        const post = await Post.findById(postId);

        if (post) {
          if (post.likes.find(like => like.username == context.user.username)) {
            // Post already liked - unlike post
            // TODO: the below filter function is not filtering out the existing like
            post.likes = post.likes.filter(like => like.username == context.user.username);
            await post.save();

            return post;
          } else {
            // Post not liked - add like to post
            const updatedPost = await Post.findByIdAndUpdate(
              { _id: postId },
              { $push: { likes: { username: context.user.username } } },
              { new: true }
            ).populate('likes');

            return updatedPost;
          }
        } else {
          // post not found, throw error
        }
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { postId, commentBody }, context) => {
      if (context.user) {
        const updatedPost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $push: { comments: { commentBody, username: context.user.username } } },
          { new: true }
        );

        return updatedPost;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
