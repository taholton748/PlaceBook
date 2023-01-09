const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: 'You must provide a first name!'
  },
  lastName: {
    type: String,
    required: 'You must provide a last name!'
  },
  email: {
    type: String,
    required: 'You must provide an email!',
    unique: true,
    match: [/.+@.+\..+/, 'Please provide a valid email address!']
  },
  password: {
    type: String,
    required: 'You must provide a password!',
    minlength: 7
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
