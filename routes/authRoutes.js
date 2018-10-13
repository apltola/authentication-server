const passport = require('passport'); //this has nothing to do with the stuff in our passport.js config file
const { checkExistingUser } = require('../controllers/authController');

module.exports = function(app) {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/user');
  })
  
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/user');
  })

  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/'}), (req, res) => {
    res.redirect('/user');
  })

  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/'}), (req, res) => {
    res.redirect('/user');
  })

  //local register
  app.post('/api/register', checkExistingUser, passport.authenticate('local', { failureRedirect: '/'}), (req, res) => {
    res.send(req.user);
  }); 

  app.get('/api/logout', (req, res) => {
    req.logout(); //logout() is added by passport
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); //req.user is added by passport
  });
}