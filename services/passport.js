const keys = require('../config/keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

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
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      console.log('user already exists!');
      return done(null, existingUser);
    }

    const newUser = await new User({
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      imageUrl: profile.photos[0].value
    }).save(); //new User() creates a new model instance and saves it to mongo

    done(null, newUser);
  }
));

passport.use(new FacebookStrategy({
  clientID: '325772617973858',
  clientSecret: 'cb5d91c360d391ef4a954a16b385117d',
  callbackURL: "https://powerful-tor-65248.herokuapp.com/auth/facebook/callback",
  proxy: true
},
async (accessToken, refreshToken, profile, done) => {
  console.log({profile});

  const newUser = await new User({
    facebookId: profile.id,
    displayName: 'facebook testi',
    firstName: 'facebook',
    lastName: 'testi'
  }).save();

  done(null, newUser);
}
));