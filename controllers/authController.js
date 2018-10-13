const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {

  checkExistingUser: async (req, res, next) => {
    const { email, username } = req.body;
    const usernameTaken = await User.findOne({ username_lower: username.toLowerCase() });
    const emailTaken = await User.findOne({ email: email });

    if (usernameTaken && !emailTaken) {
      res.status(403).send('username_taken');
    }
    
    else if (emailTaken && !usernameTaken) {
      res.status(403).send('email_taken');
    }

    else if(usernameTaken && emailTaken) {
      res.status(403).send('username_and_email_taken');
    }

    else next();
  }
}