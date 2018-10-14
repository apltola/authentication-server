const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {

  findOrCreateUser: async (req, res, next) => {
    const { email, username, password } = req.body;
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

    else {
      //lisätään uusi user mongoon jo tässä vaiheessa...
      const newUser = await new User({
        email: email,
        username: username,
        username_lower: username.toLowerCase(),
        password: password
      });

      await newUser.hashPassword();
      await newUser.save();
      next();
    }
  },

  findUser: async (req, res, next) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username_lower: username.toLowerCase() });
    if (!existingUser) {
      res.status(404).send('invalid_username');
    }

    else next();
  }
}