const mongoose = require('mongoose');

const { Schema } = mongoose;

const likeSchema = new Schema({
  username: {
    type: String,
    required: 'Must provide username'
  }
});

module.exports = likeSchema;
