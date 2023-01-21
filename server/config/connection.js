const mongoose = require('mongoose');

require('dotenv').config();

mongoose
  .set('strictQuery', false)
  .set('strictPopulate', false);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/PlaceBook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
