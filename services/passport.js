const keys = require('../config/keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => { //'user' is passed from done-function from newGoogleStrategy callback!
  done(null, user.id); //id comes from mongo instance and it is the identifying piece of information that is used to authenticate the user. it gets stuffed into COOKIE!
});

passport.deserializeUser((id, done) => { //id comes from the cookie, we're using to find the user from mongo
  User.findById(id).then(user => {
    done(null, user); //this adds the user instance to req => req.user !!
  });
});

passport.use(new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then(existingUser => {
        if (existingUser) {
          console.log('USER ALREADY EXISTS !!!! ');
          done(null, existingUser); //error is null
        }
        
        else {
          new User({ googleId: profile.id }) //new User() creates a new model instance and saves it to mongo
            .save()
            .then(user => done(null, user)); //'user' is the instance we got back from the promise.
        }
      });
  }
));