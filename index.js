const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, 'client', 'dist');
  app.use(express.static(dist));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dist, 'index.html'));
  });
}

app.listen(PORT, function() { console.log(`RUNNING IN ${PORT}`) });