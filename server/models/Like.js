const mongoose = require('mongoose');

const { Schema } = mongoose;

const postLikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  }
});

const Like = mongoose.model('Like', postLikeSchema);

module.exports = Like;
