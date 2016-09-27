const isomorphicCookie = require('../src/index');

console.log(isomorphicCookie.load('serverCookie'));
console.log(isomorphicCookie.load('clientCookie'));

// isomorphicCookie.save('clientCookie', 'clientCookie value here 5');
isomorphicCookie.save('serverCookie', 'serverCookie value here 6');
isomorphicCookie.remove('clientCookie');
