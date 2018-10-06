const passport = require('passport'); //this has nothing to do with the stuff in our passport.js config file

module.exports = function(app) {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/user');
  })
  
  app.get('/api/logout', (req, res) => {
    req.logout(); //logout() is added by passport
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); //req.user is added by passport
  });
}