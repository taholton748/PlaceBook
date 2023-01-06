const mongoose = require('mongoose');

mongoose
  .set('strictQuery', false)
  .set('strictPopulate', false);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project_3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
