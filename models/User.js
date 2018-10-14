const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  provider: String,
  googleId: String,
  facebookId: String,
  twitterId: String,
  githubId: String,
  username: {type: String, unique: true},
  username_lower: {type: String, unique: true},
  password: String,
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  imageUrl: String,
  location: String
});

userSchema.methods.hashPassword = function() {
  const user = this;

  bcrypt.genSalt(10, function(error, salt) {
    if (error) {
      return;
    }

    bcrypt.hash(user.password, salt, null, function(error, hash) {
      if (error) {
        return; 
      }

      user.password = hash;
      return user;
    })
  })
};

userSchema.methods.verifyPassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch); 
  })
};

mongoose.model('users', userSchema);