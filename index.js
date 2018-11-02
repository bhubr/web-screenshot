const express = require('express');
const getPic = require('./getPic');
const app = express();

app.get('/', (req, res) => {
  const { url, dest } = req.query;
  if(!url) {
    return res.status(400).json({ error: 'missing required GET param `url`' });
  }
  const destPath = dest || __dirname;

  getPic(url, destPath)
    .then(path => res.json({ path, mime: 'image/png' }))
    .catch(err => res.status(500).json({ error: err.message }));
})

app.listen(process.env.PORT || 5040);