const mongoose = require('mongoose');

mongoose
  .set('strictQuery', false)
  .set('strictPopulate', false);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/PlaceBook', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
