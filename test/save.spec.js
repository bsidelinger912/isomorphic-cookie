/* eslint-env jasmine */
const expect = require('expect');
const cookie = require('cookie');

const _serialize = cookie.serialize;

const encoding = require('../src/encoding');
const save = require('../src/save').default;

describe('save()', () => {
  beforeEach(() => {
    // mock decode and cookie
    encoding.encode = expect.createSpy().andCall((string) => string);
    cookie.serialize = expect.createSpy();
  });

  afterEach(() => {
    encoding.encode = _encode;
    cookie.serialize = _serialize;
  });

  it('should save to cookies in browser');

  it('should add to response header on server');
});
