const mongoose = require('mongoose');

const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const commentSchema = require('./Comment');
const likeSchema = require('./Like');

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'Must provide userId'
  },
  location: {
    type: String,
    required: 'You must provide a location',
    metadata: Object
  },
  postBody: {
    type: String,
    required: 'You must add a body',
    minLength: 1
  },
  rating: {
    type: Number,
    required: 'Please provide a rating',
    minLength: 0
  },
  // TODO: can we figure out how to upload photos to an array and display them in a slideshow style?
  // possibly by using semantic.ui
  photos: [{
    type: String,
  }],
  comments: [commentSchema],
  likes: [likeSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

// likeCount
postSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

// commentCount
postSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
