const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  provider: String,
  googleId: String,
  facebookId: String,
  twitterId: String,
  username: String,
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  imageUrl: String,
  location: String
});

mongoose.model('users', userSchema);