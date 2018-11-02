const express = require('express');
const getPic = require('./getPic');
const app = express();
const { accessKey } = require('./settings');

const keyCheckMw = (req, res, next) => {
  const { key } = req.query;
  if(!key || key !== accessKey) {
    return res.status(401).json({ error: 'Forbidden' });
  }
  next();
};

app.get('/', keyCheckMw, (req, res) => {
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