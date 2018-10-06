const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  imageUrl: String
});

mongoose.model('users', userSchema);