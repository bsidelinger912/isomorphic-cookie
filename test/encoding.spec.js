/* eslint-env jasmine */
const expect = require('expect');

const encoding = require('../src/encoding');

describe('encoding.encode()', () => {
  it('should leave base64 strings alone', () => {
    const encoded = encoding.encode('dGVzdGlu');
    expect(encoded).toEqual('dGVzdGlu');
  });

  it('should url encode strings', () => {
    const encoded = encoding.encode('my string');
    expect(encoded).toEqual(encodeURIComponent('my string'));
  });

  it('should stringify objects', () => {
    const encoded = encoding.encode({ foo: 'bar' });
    expect(encoded).toEqual(encodeURIComponent(JSON.stringify({ foo: 'bar' })));
  });
});

describe('encoding.decode()', () => {
  it('should not convert undefined to a string', () => {
    const decoded = encoding.decode(undefined);

    expect(decoded).toEqual(undefined);
  });

  it('should leave base64 strings alone', () => {
    const decoded = encoding.decode('dGVzdGlu');
    expect(decoded).toEqual('dGVzdGlu');
  });

  it('should uri decode strings', () => {
    const decoded = encoding.decode(encodeURIComponent('my string'));

    expect(decoded).toEqual('my string');
  });

  it('should parse json strings', () => {
    const decoded = encoding.decode(encodeURIComponent(JSON.stringify({ foo: 'bar' })));

    expect(decoded).toEqual({ foo: 'bar' });
  });
});
