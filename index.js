const express = require('express');
const app = express();
const path = require('path');

const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/User');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });


require('./services/passport');
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