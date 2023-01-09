const mongoose = require('mongoose');

const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const commentSchema = require('./Comment');
const likeSchema = require('./Like');

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'Must provide userId!'
  },
  title: {
    type: String,
    required: 'You must provide a title!',
    minLength: 1
  },
  postBody: {
    type: String,
    required: 'You must add a body',
    minLength: 1
  },
  // TODO: can we figure out how to upload photos to an array and display them in a slideshow style?
  // possibly by using semantic.ui
  photos: [{
    type: String,
  }],
  location: {
    type: String,
    required: 'You must provide a location!'
  },
  comments: [commentSchema],
  likes: [likeSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

// returns a new property 'likeCount'
postSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
