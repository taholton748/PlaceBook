const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  username: {
    type: String,
    default: req.user.username,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;