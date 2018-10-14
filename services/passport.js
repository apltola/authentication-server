const keys = require('../config/keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;

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
      provider: profile.provider,
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

passport.use(new FacebookStrategy(
  {
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
    callbackURL: "https://powerful-tor-65248.herokuapp.com/auth/facebook/callback",
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ facebookId: profile.id });

    if (existingUser) {
      console.log('user already exists!');
      return done(null, existingUser);
    }

    let email = '';
    if (profile.emails && profile.emails[0]) {
      email = profile.emails[0].value;
    }

    let photo = '';
    if (profile.photos && profile.photos[0]) {
      photo = profile.photos[0].value;
    }

    const newUser = await new User({
      provider: profile.provider,
      facebookId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: email,
      imageUrl: photo
    }).save();

    done(null, newUser);
  }
));

passport.use(new TwitterStrategy(
  {
    consumerKey: keys.twitterAPIKey,
    consumerSecret: keys.twitterAPISecret,
    callbackURL: '/auth/twitter/callback',
    proxy: true
  },
  async (token, tokenSecret, profile, done) => {
    const existingUser = await User.findOne({ twitterId: profile.id });

    if (existingUser) {
      console.log('user already exists!');
      return done(null, existingUser);
    }

    const newUser = await new User({
      provider: profile.provider,
      twitterId: profile.id,
      username: profile.username,
      username_lower: profile.username.toLowerCase(),
      displayName: profile.displayName,
      imageUrl: profile.photos[0].value
    }).save();

    done(null, newUser);
  }
))

passport.use(new GithubStrategy(
  {
    clientID: keys.githubClientID,
    clientSecret: keys.githubClientSecret,
    callbackURL: 'https://powerful-tor-65248.herokuapp.com/auth/github/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log({ profile });
    const existingUser = await User.findOne({ githubId: profile.id });

    if (existingUser) {
      console.log('user already exists!');
      return done(null, existingUser);
    }

    const newUser = await new User({
      provider: profile.provider,
      displayName: profile.displayName,
      username: profile.username,
      username_lower: profile.username.toLowerCase(),
      imageUrl: profile.photos[0].value
    }).save();

    done(null, newUser);
  }
));

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const existingUser = await User.findOne({ username: username });
      console.log({existingUser});

      if (!existingUser) {
        return done(null, false);
      }

      existingUser.verifyPassword(password, (error, isMatch) => {
        if (error) {
          return done(error);
        }

        if (!isMatch) {
          return done(null, false);
        }

        return done(null, existingUser);
      })

    } catch(error) {
      return done(error);
    }

    // const newUser = await new User({
    //   provider: 'local',
    //   username: username,
    //   username_lower: username.toLowerCase(),
    //   password: password
    // }).save();

    // done(null, newUser);
  }
));