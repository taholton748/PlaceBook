const mongoose = require('mongoose');
const { Schema } = mongoose;

const postLikeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
});

const Like = mongoose.model('Like', postLikeSchema);

module.exports = Like;