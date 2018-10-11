const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  provider: String,
  googleId: String,
  facebookId: String,
  twitterId: String,
  githubId: String,
  username: String,
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  imageUrl: String,
  location: String
});

userSchema.methods.verifyPassword = function() {
  
};

mongoose.model('users', userSchema);