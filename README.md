# isomorphic-cookie
Load, save and remove cookies within your isomorphic application

## Isomorphic cookies!
The initial idea for this package came from the popular react-cookie package, but we've made it a little harder to make serious mistakes using plugToRequest() with async server operations.  Instead of providing that function, that allows you to only read/write to one request at a time (the current plugged request), we've allowed for passing the request to the load() function and the response to the save() and remove() functions.  This way it's easier to reason about exactly which request/response you're interacting with.

This currently supports Express and Hapi servers. If you need to support another server framework, feel free to send a PR or make a feature request in [issues](https://github.com/bsidelinger912/isomorphic-cookie/issues).

## Download
`npm install @discodigital/isomorphic-cookie`


# Examples

### On the client:
```js
const isomorphicCookie = require('isomorphic-cookie');

console.log(isomorphicCookie.load('serverCookie'));
console.log(isomorphicCookie.load('clientCookie'));

isomorphicCookie.save('clientCookie', 'clientCookie value here');

```

### On the server (Hapi):
```js
'use strict';

const Hapi = require('hapi');
const path = require('path');
const isomorphicCookie = require('isomorphic-cookie');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000,
});

let callIndex = 0;

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path:'/',
    handler: (request, reply) => {
      callIndex++;

      console.log(`client cookie: ${isomorphicCookie.load('clientCookie', request)}`);
      console.log(`server cookie: ${isomorphicCookie.load('serverCookie', request)}`);

      isomorphicCookie.save('serverCookie', `serverCookie, call #: ${callIndex}`, {}, reply);

      reply.file(path.join(__dirname, 'index.html'));
    },
  });

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});

```

### On the server (Express):
```js
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const isomorphicCookie = require('isomorphic-cookie');

const app = express();

app.use(express.static('dist'));
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log(`client cookie: ${isomorphicCookie.load('clientCookie', req)}`);
  console.log(`server cookie: ${isomorphicCookie.load('serverCookie', req)}`);

  isomorphicCookie.save('serverCookie', `serverCookie, call #: ${callIndex}`, {}, res);

  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8000);

```


## Usage

### `isomorphicCookie.load(name, [request], [doNotParse])`
### `isomorphicCookie.save(name, val, [opt], [response])`
### `isomorphicCookie.remove(name, [opt], [response])`

## opt

### path
> cookie path

### expires
> absolute expiration date for the cookie (Date object)

### domain
> domain for the cookie


## License
This project is under the MIT license. You are free to do whatever you want with it.
