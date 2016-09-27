# isomorphic-cookie
Load, save and remove cookies within your isomorphic application

## Isomorphic cookies!
If using on Node.js with express or hapi, you can hook into the request and reply using `var unplug = isomorphicCookie.plugToRequest(req, res);`

*(require the cookieParser middleware for express)*

To ensure long running async operations do not attempt to alter cookies after the request has been sent, call the `unplug` function that is returned in a finally block in your router.

If you are within a non-browser or Node.js environment, you can use `isomorphicCookie.setRawCookie(req.headers.cookie)`

This currently supports Express and Hapi. If you need to support another framework, feel free to send a PR.

## Download
`npm install isomorphic-cookie`<br />

# Examples

```js
import { Component } from 'react';
import cookie from 'isomorphic-cookie';

export default class MyApp extends Component {
  constructor(props) {
    super(props);

    this.state =  { userId: cookie.load('userId') };
  }

  onLogin(userId) {
    this.setState({ userId });
    cookie.save('userId', userId, { path: '/' });
  }

  onLogout() {
    cookie.remove('userId', { path: '/' });

    /** Clear all cookies starting with 'session' (to get all cookies, omit regex argument) */
    Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name, { path: '/' }))
  }

  render() {
    return (
      <LoginPanel onSuccess={this.onLogin.bind(this)} />
    );
  }
}
```

## Without CommonJS
You can use isomorphic-cookie with anything by using the global variable `isomorphicCookie`.

*Note that `window` needs to exist to use `isomorphicCookie`.*

## Usage

### `isomorphicCookie.load(name, [doNotParse])`
### `isomorphicCookie.select([regex])`
### `isomorphicCookie.save(name, val, [opt])`
### `isomorphicCookie.remove(name, [opt])`
### `isomorphicCookie.plugToRequest(req, res): unplug()`
### `isomorphicCookie.setRawCookie(cookies)`

## opt
Support all the cookie options from the [RFC 6265](https://tools.ietf.org/html/rfc6265#section-4.1.2.1).

### path
> cookie path

### expires
> absolute expiration date for the cookie (Date object)

### maxAge
> relative max age of the cookie from when the client receives it (seconds)

### domain
> domain for the cookie

### secure
> true or false

### httpOnly
> true or false

## License
This project is under the MIT license. You are free to do whatever you want with it.
