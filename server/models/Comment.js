const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'Must provide userId!',
  },
  commentBody: {
    type: String,
    required: 'Must provide a comment body!'
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = commentSchema;
