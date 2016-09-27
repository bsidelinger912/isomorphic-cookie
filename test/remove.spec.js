/* eslint-env jasmine */
const expect = require('expect');
const cookie = require('cookie');

const _serialize = cookie.serialize;

const encoding = require('../src/encoding');
const remove = require('../src/remove').default;

const _encode = encoding.encode;

describe('remove()', () => {
  beforeEach(() => {
    // mock decode and cookie
    encoding.encode = expect.createSpy().andCall((string) => string);
    cookie.serialize = expect.createSpy();
  });

  afterEach(() => {
    encoding.encode = _encode;
    cookie.serialize = _serialize;
  });

  it('should remove from cookies on the client', () => {
    // mock the browser
    global.document = {
      cookie: '',
    };

    remove('testName');

    expect(cookie.serialize)
      .toHaveBeenCalled()
      .toHaveBeenCalledWith('testName', '', { expires: new Date(1970, 1, 1, 0, 0, 1) });

    global.document = undefined;
  });

  it('should remove with headers on server', () => {
    const resExpress = {
      clearCookie: expect.createSpy(),
    };

    remove('testName', {}, resExpress);

    expect(resExpress.clearCookie)
      .toHaveBeenCalled()
      .toHaveBeenCalledWith('testName', {});

    const resHapi = {
      unstate: expect.createSpy(),
    };

    remove('testName', {}, resHapi);

    expect(resHapi.unstate)
      .toHaveBeenCalled()
      .toHaveBeenCalledWith('testName');

  });
});
