const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const isomorphicCookie = require('../dist/index');

const app = express();

let callIndex = 0;

app.use(express.static('dist'));
app.use(cookieParser());

app.get('/', (req, res) => {
  const unplug = isomorphicCookie.plugToRequest(req, res);
  callIndex++;

  console.log(`client cookie: ${isomorphicCookie.load('clientCookie')}`);
  console.log(`server cookie: ${isomorphicCookie.load('serverCookie')}`);

  isomorphicCookie.save('serverCookie', `serverCookie, call #: ${callIndex}`);
  isomorphicCookie.remove('serverCookie');

  res.sendFile(path.join(__dirname, 'index.html'));

  unplug();
});

app.listen(8000);
