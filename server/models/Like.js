const mongoose = require('mongoose');

const { Schema } = mongoose;

const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = likeSchema;
