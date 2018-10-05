const passport = require('passport'); //this has nothing to do with the stuff in our passport.js config file

module.exports = function(app) {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/logout', (req, res) => {
    req.logout(); //logout() is added by passport
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); //req.user is added by passport
  });
}  