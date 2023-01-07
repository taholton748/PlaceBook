const mongoose = require('mongoose');

const { Schema } = mongoose;

// TODO: add comment model so the below can be imported
// const commentSchema = require('./Comment');

const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  title: { type: String, required: 'You must provide a title!' },
  description: { type: String, required: 'You must add a description!' },
  photos: { type: String },
  location: { type: String },
  postLikes: [
    {
      userId: { type: String, required: true },
    },
  ],
  // need to add comment model so this can be used
  // comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  // },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
