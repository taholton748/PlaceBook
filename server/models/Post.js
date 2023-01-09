const mongoose = require('mongoose');

const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const likeSchema = require('./Like');

const postSchema = new Schema({
  title: {
    type: String,
    required: 'You must provide a title!'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'Must provide userId!'
  },
  description: {
    type: String,
    required: 'You must add a description'
  },
  photo: {
    type: String,
  },
  location: {
    type: String,
    required: 'You must provide a location!'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [likeSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
