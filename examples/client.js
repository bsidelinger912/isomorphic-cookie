const isomorphicCookie = require('../src/index');

console.log(isomorphicCookie.load('serverCookie'));
console.log(isomorphicCookie.load('clientCookie'));

// isomorphicCookie.save('clientCookie', 'clientCookie value here 5');
isomorphicCookie.save('clientCookie', 'clientCookie value here 2', { secure: false });
// isomorphicCookie.remove('clientCookie');
