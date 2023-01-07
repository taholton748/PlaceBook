const mongoose = require('mongoose');
const { Schema } = mongoose;
why
const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  title: {
    type: String,
    required: 'You must provide a title!'
  },
  username: {
    type: String,
    default: req.user.username,
    required: 'You must add a description!'
  },
  discreption: {
    type: String,
    required: true
  },
  photo: {
    type: String,
  },
  location: {
    type: String,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  postLikes: [{
    type: Number,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)

  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;