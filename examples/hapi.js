'use strict';

const Hapi = require('hapi');
const path = require('path');
const isomorphicCookie = require('../dist/index');

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

  /**
   * Attempt to serve static requests from the public folder.
   */
  server.route({
    method: '*',
    path: '/{params*}',
    handler: (request, reply) => {
      const reqPath = `../dist${request.path}`;
      reply.file(path.join(__dirname, reqPath));
    },
  });

  // Add the index route
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

  // Start the server
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server running at:', server.info.uri);
  });
});
