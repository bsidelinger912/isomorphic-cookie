var isomorphicCookie = require('./dist/index');
var rewire = require('rewire')


describe('isomorphicCookie', function() {
  beforeEach(function() {
    isomorphicCookie.setRawCookie('');
  });

  describe('load', function() {
    it('should not crash if cookies undefined', function() {
      expect(function() {
        isomorphicCookie.setRawCookie(undefined);
      }).not.toThrow();

      expect(isomorphicCookie.load('test')).toBe(undefined);
    });

    it('should read the cookie', function() {
      isomorphicCookie.setRawCookie('test=test');
      expect(isomorphicCookie.load('test')).toBe('test');
    });

    it('should parse if an object', function() {
      isomorphicCookie.setRawCookie('test={"test": true}');
      expect(isomorphicCookie.load('test').test).toBe(true);
    });

    it('should not parse if we ask not to', function() {
      isomorphicCookie.setRawCookie('test={"test": true}');
      expect(typeof isomorphicCookie.load('test', true)).toBe('string');
    });
  });

  describe('select', function() {
    it('should not crash if cookies undefined', function() {
      expect(function() {
        isomorphicCookie.setRawCookie(undefined);
      }).not.toThrow();

      expect(isomorphicCookie.select(/^test/g)).toEqual({});
    });

    it('should select and read all the matching cookies into an object', function() {
      isomorphicCookie.setRawCookie('test=foo;something=bar;foo=bar');
      expect(isomorphicCookie.select(/(test|foo)/)).toEqual({ test: 'foo', foo: 'bar' });
    });

    it('should read all cookies into an object if no parameter is passed', function() {
      isomorphicCookie.setRawCookie('test=foo;something=bar;foo=bar');
      expect(isomorphicCookie.select()).toEqual({ test: 'foo', something: 'bar', foo: 'bar' });
    });
  })

  describe('save', function() {
    it('should not crash if not in the browser', function() {
      expect(function() {
        isomorphicCookie.save('test', 'test');
      }).not.toThrow();
    });

    it('should update the value', function() {
      isomorphicCookie.setRawCookie('test=test');
      expect(isomorphicCookie.load('test')).toBe('test');

      isomorphicCookie.save('test', 'other');
      expect(isomorphicCookie.load('test')).not.toBe('test');
    });

    it('should stringify an object', function() {
      isomorphicCookie.setRawCookie('test=test');
      expect(isomorphicCookie.load('test')).toBe('test');

      isomorphicCookie.save('test', { test: true });
      expect(typeof isomorphicCookie.load('test')).toBe('object');
    });
  });

  describe('remove', function() {
    it('should do nothing if not in the browser', function() {
      expect(function() {
        isomorphicCookie.remove('test');
      }).not.toThrow();
    });
  });


  describe('serverCookie', function() {

    var serverCookie = null
    beforeEach(function() {
      /** Import with rewire so we can check on private variable values */
      serverCookie = rewire('./index')
    })
    afterEach(function() {
      serverCookie = null
    })


    describe('plugToRequest', function() {
      it('should load the request cookie', function() {
        serverCookie.plugToRequest({ cookie: { test: 123 } });
        expect(serverCookie.load('test')).toBe(123);
      });

      it('should load the request cookies', function() {
        serverCookie.plugToRequest({ cookies: { test: 123 } });
        expect(serverCookie.load('test')).toBe(123);
      });

      it('should load the raw cookie header', function() {
        serverCookie.plugToRequest({ headers: { cookie: 'test=123' } });
        expect(serverCookie.load('test')).toBe(123);
      });

      it('should clear the cookies if their is none', function() {
        serverCookie.setRawCookie('test=123');
        expect(serverCookie.load('test')).toBe(123);

        serverCookie.plugToRequest({});
        expect(serverCookie.load('test')).toBeUndefined();
      });
    });


    describe('unplug', function () {
      it('should return an unplug function', function() {
        var unplug = serverCookie.plugToRequest({ headers: { cookie: 'test=123' } });
        expect(typeof unplug).toBe('function')
      })

      it('should set _res private variable when plugToRequest is called', function() {
        var req = { headers: { cookie: 'test=123' } }
        var res = { headersSent: false }
        var unplug = serverCookie.plugToRequest(req, res);
        expect(serverCookie.__get__('_res')).toBe(res)

      })

      it('should clear reference to response cookie when called', function() {
        var req = { headers: { cookie: 'test=123' } }
        var res = { headersSent: false }
        var unplug = serverCookie.plugToRequest(req, res);
        expect(serverCookie.load('test')).toBe(123);
        expect(serverCookie.__get__('_res')).toBe(res)
        unplug()
        expect(serverCookie.load('test')).toBeUndefined();
        expect(serverCookie.__get__('_res')).toBe(null)
      })
    });
  });
});
