/* eslint-env jasmine */
const expect = require('expect');
const cookie = require('cookie');

const _parse = cookie.parse;

const encoding = require('../src/encoding');
const load = require('../src/load').default;

const _decode = encoding.decode;

describe('load()', () => {
  beforeEach(() => {
    // mock decode and cookie
    encoding.decode = expect.createSpy().andCall((string) => string);
    cookie.parse = expect.createSpy().andReturn({ test: 'result' });
  });

  afterEach(() => {
    encoding.decode = _decode;
    cookie.parse = _parse;
  });

  it('should check cookies in the browser', () => {
    // mock the browser
    global.document = {
      cookie: 'test=result',
    };

    load('test');

    expect(cookie.parse)
      .toHaveBeenCalled()
      .toHaveBeenCalledWith(global.document.cookie);

    expect(encoding.decode)
      .toHaveBeenCalled()
      .toHaveBeenCalledWith('result', undefined);
  });

  it('should check headers on the server', () => {
    const result = load('test', { cookie: { test: 'result' } });
    expect(encoding.decode).toHaveBeenCalled();
    expect(result).toEqual('result');

    const result2 = load('test', { cookies: { test: 'result' } });
    expect(result2).toEqual('result');

    const result3 = load('test', { headers: { cookie: 'test=result' } });
    expect(result3).toEqual('result');
    expect(cookie.parse)
      .toHaveBeenCalled()
      .toHaveBeenCalledWith('test=result');
  });
});
