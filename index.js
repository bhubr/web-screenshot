const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
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

app.use(morgan('dev'));

app.get('/', keyCheckMw, (req, res) => {
  const { url, dest } = req.query;
  if(!url) {
    return res.status(400).json({ error: 'missing required GET param `url`' });
  }
  // const destPath = dest || __dirname;

  getPic(url)
    .then(path => {
      console.log('##path', path);
      res.writeHead(200, { 'content-type': 'image/png' });
      fs.createReadStream(path).pipe(res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message })
    });
})

app.listen(process.env.PORT || 5040);
