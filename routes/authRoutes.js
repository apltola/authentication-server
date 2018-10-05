const passport = require('passport'); //this has nothing to do with the stuff in our passport.js config file

module.exports = function(app) {
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
}  