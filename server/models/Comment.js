const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  username: {
    type: String,
    required: 'Must provide username!',
  },
  commentBody: {
    type: String,
    required: 'Must provide a comment body!'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = commentSchema;
