const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/User');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true }).then(() => {
  console.log('CONNECTED TO MONGO!')
}).catch(err => {
  console.log('MONGO CONNECTION ERROR: ', err);
});

require('./services/passport');
const cookieSession = require('cookie-session');
const passport = require('passport');
app.use(cookieSession({ //cookieSession middleware handles cookie stuff. it extracts data from the browser cookie and assigns it to req.session. This happens before deserializeUser so passport is not looking at the cookie, it is looking at req.session.
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');
authRoutes(app);


if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, 'client', 'dist');
  app.use('/', express.static(dist));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dist, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() { console.log(`RUNNING IN ${PORT}`) });